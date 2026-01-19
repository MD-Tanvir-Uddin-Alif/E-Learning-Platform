# -------------------------------
# Import From Libraies
# -------------------------------
from fastapi import APIRouter, HTTPException, Depends, File, Form, UploadFile
from collections import Counter
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import uuid4
import shutil
import json
import os
# -------------------------------
# Import From Files
# -------------------------------
from models.video_progress_model import VideoProgressModel
from models.enrollment_model import EnrollmentModel
from models.category_model import CategoryModel
from models.payment_model import PaymentModel
from models.course_model import CourseModel
from models.video_model import VideoModel
from models.user_models import UserModel

from schemas.course_schema import CourseCreate, CourseResponse, CourseOut, MultiVideoResponse, CourseListResponse, CourseDetailResponse

from utils.permission import instructor_required

from database_config import get_db

router = APIRouter(tags=["Instructor"])


COURSE_IMAGE_DIR = "uploads/course_images"

os.makedirs(COURSE_IMAGE_DIR, exist_ok=True)

VIDEO_UPLOAD_DIR = "uploads/videos"
os.makedirs(VIDEO_UPLOAD_DIR, exist_ok=True)


# -------------------------------
# Create Course
# -------------------------------
@router.post("/create-course", response_model=CourseResponse)
def create_course(
    title: str = Form(...),
    sub_title: Optional[str] = Form(None),
    description: str = Form(""),
    is_paid: bool = Form(...),
    price: float = Form(None),
    category_id: int = Form(...),
    image: UploadFile = File(None),
    user = Depends(instructor_required),
    db: Session = Depends(get_db)
):
    category = db.query(CategoryModel).filter(CategoryModel.id == category_id).first()
    if not category:
        raise HTTPException(404, "Category not found")

    if is_paid and (price is None or price <= 0):
        raise HTTPException(400, "Paid course must have a valid price")

    image_path = None
    if image:
        ext = image.filename.split(".")[-1]
        file_name = f"{uuid4()}.{ext}"
        file_location = os.path.join(COURSE_IMAGE_DIR, file_name)

        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        image_path = file_location

    new_course = CourseModel(
        title=title,
        sub_title=sub_title,
        description=description,
        is_paid=is_paid,
        price=price,
        category_id=category_id,
        instructor_id=user.id,
        image_url=image_path
    )

    db.add(new_course)
    db.commit()
    db.refresh(new_course)

    return new_course


# -------------------------------
# View Own Courses
# -------------------------------
@router.get("/my-courses", response_model=List[CourseListResponse])
def get_my_courses(
    user = Depends(instructor_required),
    db: Session = Depends(get_db)
):
    """
    Fetch all courses created by the logged-in instructor.
    Returns: ID, Title, SubTitle, Image, Price, Paid Status
    """
    courses = db.query(CourseModel).filter(
        CourseModel.instructor_id == user.id
    ).all()

    return courses


# -------------------------------
# GET SINGLE COURSE DETAILS 
# -------------------------------
@router.get("/courses/{course_id}", response_model=CourseDetailResponse)
def get_course_details(
    course_id: int,
    user = Depends(instructor_required),
    db: Session = Depends(get_db)
):
    """
    Fetch details of a specific course + its videos.
    Only allows access if the course belongs to the logged-in instructor.
    """
    course = db.query(CourseModel).filter(
        CourseModel.id == course_id,
        CourseModel.instructor_id == user.id
    ).first()

    if not course:
        raise HTTPException(status_code=404, detail="Course not found or unauthorized")
    
    # SQLAlchemy relationship 'videos' will be automatically populated 
    # and validated by Pydantic 'CourseDetailResponse'
    return course





# -------------------------------
# UPDATE COURSE DETAILS
# -------------------------------
@router.put("/courses/{course_id}", response_model=CourseResponse)
def update_course(
    course_id: int,
    title: Optional[str] = Form(None),
    sub_title: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    is_paid: Optional[bool] = Form(None),
    price: Optional[float] = Form(None),
    category_id: Optional[int] = Form(None),
    image: UploadFile = File(None),
    user = Depends(instructor_required),
    db: Session = Depends(get_db)
):
    """
    Update any field of a course.
    Send only the fields you want to update.
    """
    # 1. Find the course
    course = db.query(CourseModel).filter(
        CourseModel.id == course_id,
        CourseModel.instructor_id == user.id
    ).first()

    if not course:
        raise HTTPException(status_code=404, detail="Course not found or unauthorized")
    
    if course.is_published:
        raise HTTPException(
            status_code=400, 
            detail="Cannot update a published course. Unpublish it first to make changes."
        )

    # 2. Update fields if provided
    if title is not None:
        course.title = title
    
    if sub_title is not None:
        course.sub_title = sub_title
        
    if description is not None:
        course.description = description

    # --- PRICE & PAID LOGIC ---
    if is_paid is not None:
        # If explicitly setting to PAID (True)
        if is_paid is True:
            # Check if price is provided in this request
            if price is not None:
                if price <= 0:
                    raise HTTPException(status_code=400, detail="Price must be greater than 0 for a paid course.")
            # If price is NOT provided, check if existing price is valid
            elif course.price is None or course.price <= 0:
                raise HTTPException(status_code=400, detail="You must provide a valid price when setting a course to Paid.")
        
        # Apply change
        course.is_paid = is_paid
        
        # If switching to Free, force price to 0
        if is_paid is False:
            course.price = 0.0

    # Update Price
    if price is not None:
        # Only update price if the course is Paid (or becoming Paid)
        if course.is_paid:
            if price <= 0:
                raise HTTPException(status_code=400, detail="Price must be greater than 0.")
            course.price = price
        elif is_paid is None:
            # User sent a price, but didn't send is_paid, and the course is currently Free.
            raise HTTPException(status_code=400, detail="Cannot set a price for a Free course. Set is_paid=True.")
    # --------------------------

    if category_id is not None:
        # Validate new category
        cat_exists = db.query(CategoryModel).filter(CategoryModel.id == category_id).first()
        if not cat_exists:
            raise HTTPException(404, "Category not found")
        course.category_id = category_id

    # 3. Handle Image Update
    if image:
        ext = image.filename.split(".")[-1]
        filename = f"{uuid4()}.{ext}"
        image_path = f"{COURSE_IMAGE_DIR}/{filename}"
        
        with open(image_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        
        course.image_url = image_path

    db.commit()
    db.refresh(course)
    return course


# -------------------------------
# PUBLISH COURSE
# -------------------------------
@router.put("/courses/{course_id}/publish")
def publish_course(
    course_id: int,
    publish_status: bool = True, 
    user = Depends(instructor_required),
    db: Session = Depends(get_db)
):
    """
    Publish a course to make it visible to students.
    """
    course = db.query(CourseModel).filter(
        CourseModel.id == course_id,
        CourseModel.instructor_id == user.id
    ).first()

    if not course:
        raise HTTPException(status_code=404, detail="Course not found or unauthorized")
    
    if publish_status is False: # If trying to UNPUBLISH
        enrolled_count = db.query(EnrollmentModel).filter(
            EnrollmentModel.course_id == course_id
        ).count()
        
        if enrolled_count > 0:
            raise HTTPException(
                status_code=400, 
                detail="Cannot unpublish this course because students are already enrolled."
            )

    # Optional: Check if course has content before publishing
    if publish_status is True:
        video_count = db.query(VideoModel).filter(VideoModel.course_id == course_id).count()
        if video_count == 0:
             raise HTTPException(status_code=400, detail="Cannot publish an empty course. Add at least one video.")

    course.is_published = publish_status
    db.commit()

    status_msg = "Published" if publish_status else "Unpublished (Draft)"
    return {"message": f"Course has been {status_msg}", "is_published": course.is_published}

# -------------------------------
# Add video in Course
# -------------------------------
@router.post("/courses/{course_id}/add-video", response_model=MultiVideoResponse)
def add_video(
    course_id: int,
    titles: str = Form(...),   # JSON list: ["Intro", "Lesson 1"]
    orders: str = Form(...),   # JSON list: [1, 2]
    videos: List[UploadFile] = File(...),  # multiple video files
    user = Depends(instructor_required),
    db: Session = Depends(get_db)
):
    # Validate course ownership
    course = db.query(CourseModel).filter(
        CourseModel.id == course_id,
        CourseModel.instructor_id == user.id
    ).first()

    if not course:
        raise HTTPException(404, "Course not found or unauthorized")

    try:
        titles = json.loads(titles)
        orders = json.loads(orders)
    except:
        raise HTTPException(400, "titles and orders must be JSON lists")

    if len(titles) != len(orders) or len(videos) != len(titles):
        raise HTTPException(
            400,
            "titles, orders, and videos count must match"
        )

    saved_videos = []

    for idx, video in enumerate(videos):
        ext = video.filename.split(".")[-1]
        file_name = f"{uuid4()}.{ext}"
        video_path = os.path.join(VIDEO_UPLOAD_DIR, file_name)

        with open(video_path, "wb") as buffer:
            shutil.copyfileobj(video.file, buffer)

        new_video = VideoModel(
            title=titles[idx],
            order=orders[idx],
            video_url=video_path,
            course_id=course_id
        )

        db.add(new_video)
        saved_videos.append(new_video)

    db.commit()

    return {
        "message": "Videos uploaded successfully",
        "uploaded_count": len(saved_videos),
        "videos": saved_videos
    }



# -------------------------------
# MASTER VIDEO MANAGEMENT (Combines Update, Reorder, Add, Replace)
# -------------------------------
@router.put("/courses/{course_id}/manage-videos")
def manage_course_videos(
    course_id: int,
    # 1. Update Existing Metadata (Title/Order)
    video_updates: Optional[str] = Form(None),
    
    # 2. Add New Videos
    new_files: List[UploadFile] = File(None),
    new_files_data: Optional[str] = Form(None),
    
    # 3. Replace Existing Video Files
    replace_files: List[UploadFile] = File(None),
    replace_files_data: Optional[str] = Form(None),
    
    user = Depends(instructor_required),
    db: Session = Depends(get_db)
):
    import json

    # --- 1. Verify Course Ownership ---
    course = db.query(CourseModel).filter(
        CourseModel.id == course_id,
        CourseModel.instructor_id == user.id
    ).first()

    if not course:
        raise HTTPException(status_code=404, detail="Course not found or unauthorized")
    
    if course.is_published:
        raise HTTPException(status_code=400, detail="Cannot edit video details of a published course. Unpublish first.")

    # --- 2. Process Existing Video Updates (Title/Order) ---
    if video_updates:
        try:
            updates_list = json.loads(video_updates) # List[Dict]
            if not isinstance(updates_list, list):
                 raise HTTPException(400, "video_updates must be a JSON list")
                 
            for item in updates_list:
                vid_id = item.get("id")
                # Find the video
                video = db.query(VideoModel).filter(
                    VideoModel.id == vid_id, 
                    VideoModel.course_id == course_id
                ).first()
                
                if video:
                    if "title" in item:
                        video.title = item["title"]
                    if "order" in item:
                        video.order = item["order"]
        except json.JSONDecodeError:
            raise HTTPException(400, "Invalid JSON format in video_updates. Ensure you are using double quotes for keys and string values.")

    # --- 3. Process New Video Uploads ---
    if new_files:
        if not new_files_data:
            raise HTTPException(400, "new_files_data JSON is required when uploading new files")
        
        try:
            new_meta_list = json.loads(new_files_data)
        except:
            raise HTTPException(400, "Invalid JSON format in new_files_data")

        if len(new_files) != len(new_meta_list):
            raise HTTPException(400, "Count of new_files must match new_files_data")

        for i, file in enumerate(new_files):
            meta = new_meta_list[i]
            
            ext = file.filename.split(".")[-1]
            filename = f"{uuid4()}.{ext}"
            file_path = f"{VIDEO_UPLOAD_DIR}/{filename}"

            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)

            new_video = VideoModel(
                course_id=course_id,
                title=meta.get("title", file.filename),
                order=meta.get("order", 0), 
                video_url=file_path
            )
            db.add(new_video)

    # --- 4. Process Video Replacements ---
    if replace_files:
        if not replace_files_data:
            raise HTTPException(400, "replace_files_data JSON is required when replacing files")
            
        try:
            replace_meta_list = json.loads(replace_files_data)
        except:
            raise HTTPException(400, "Invalid JSON format in replace_files_data")
            
        if len(replace_files) != len(replace_meta_list):
            raise HTTPException(400, "Count of replace_files must match replace_files_data")

        for i, file in enumerate(replace_files):
            meta = replace_meta_list[i]
            target_vid_id = meta.get("id")
            
            target_video = db.query(VideoModel).filter(
                VideoModel.id == target_vid_id,
                VideoModel.course_id == course_id
            ).first()
            
            if target_video:
                if os.path.exists(target_video.video_url):
                    try:
                        os.remove(target_video.video_url)
                    except:
                        pass
                
                ext = file.filename.split(".")[-1]
                filename = f"{uuid4()}.{ext}"
                file_path = f"{VIDEO_UPLOAD_DIR}/{filename}"

                with open(file_path, "wb") as buffer:
                    shutil.copyfileobj(file.file, buffer)
                
                target_video.video_url = file_path

    # --- 5. VALIDATION: Check for Duplicate Orders ---
    # We use flush() to sync Python objects to the DB transaction without committing yet.
    # This allows us to query the 'future' state of the DB.
    db.flush()

    # Get all videos for this course (including the ones we just modified/added)
    all_videos_check = db.query(VideoModel).filter(
        VideoModel.course_id == course_id
    ).all()

    # Extract all order numbers
    all_orders = [v.order for v in all_videos_check]

    # Check if there are duplicates
    # We use Counter to find exactly which numbers appear more than once
    order_counts = Counter(all_orders)
    duplicates = [order for order, count in order_counts.items() if count > 1]

    if duplicates:
        db.rollback() # Undo everything since the request started
        raise HTTPException(
            status_code=400, 
            detail=f"Duplicate video orders found: {duplicates}. Every video must have a unique order number."
        )

    # --- 6. Commit & Return ---
    db.commit()
    
    # Return sorted list
    final_videos = db.query(VideoModel).filter(
        VideoModel.course_id == course_id
    ).order_by(VideoModel.order).all()
    
    return {
        "message": "Course videos updated successfully",
        "videos": final_videos
    }



# -------------------------------
# Delete video in Course
# -------------------------------
@router.delete("/courses/{course_id}/delete-videos")
def delete_videos(
    course_id: int,
    video_ids: str = Form(...),   # JSON list: [3, 5]
    user = Depends(instructor_required),
    db: Session = Depends(get_db)
):
    import json

    try:
        video_ids = json.loads(video_ids)
    except:
        raise HTTPException(400, "video_ids must be a JSON list")

    course = db.query(CourseModel).filter(
        CourseModel.id == course_id,
        CourseModel.instructor_id == user.id
    ).first()

    if not course:
        raise HTTPException(404, "Course not found or unauthorized")

    videos = db.query(VideoModel).filter(
        VideoModel.id.in_(video_ids),
        VideoModel.course_id == course_id
    ).all()

    if not videos:
        raise HTTPException(404, "No videos found")

    deleted = 0

    for video in videos:
        try:
            if os.path.exists(video.video_url):
                os.remove(video.video_url)
        except:
            pass

        db.delete(video)
        deleted += 1

    db.commit()

    return {
        "message": "Videos deleted successfully",
        "deleted_count": deleted
    }





# -------------------------------
# DELETE COURSE
# -------------------------------
@router.delete("/courses/{course_id}")
def delete_course(
    course_id: int,
    user = Depends(instructor_required),
    db: Session = Depends(get_db)
):
    """
    Delete a course.
    Restricted: Cannot delete if the course is Published.
    """
    course = db.query(CourseModel).filter(
        CourseModel.id == course_id,
        CourseModel.instructor_id == user.id
    ).first()

    if not course:
        raise HTTPException(status_code=404, detail="Course not found or unauthorized")

    if course.is_published:
        raise HTTPException(
            status_code=400, 
            detail="Cannot delete a published course. Unpublish it first (if no students are enrolled)."
        )

    videos = db.query(VideoModel).filter(VideoModel.course_id == course.id).all()
    
    for video in videos:
        try:
            if os.path.exists(video.video_url):
                os.remove(video.video_url)
        except:
            pass 

    try:
        if course.image_url and os.path.exists(course.image_url):
            os.remove(course.image_url)
    except:
        pass

    for video in videos:
        db.delete(video)
        
    db.delete(course)
    db.commit()

    return {"message": "Course deleted successfully"}


# ==========================================
# INSTRUCTOR ANALYTICS
# ==========================================
@router.get("/analytics/earnings")
def get_instructor_earnings(
    db: Session = Depends(get_db),
    user: UserModel = Depends(instructor_required)
):
    """
    Instructor Dashboard:
    - Total Sales (100% of course price)
    - Net Earnings (75% share)
    - List of Sales
    """
    
    # 1. Find all courses owned by this instructor
    my_courses = db.query(CourseModel).filter(
        CourseModel.instructor_id == user.id
    ).all()
    
    my_course_ids = [c.id for c in my_courses]

    if not my_course_ids:
        return {
            "total_sales": 0.0,
            "net_earnings": 0.0,
            "sales_count": 0,
            "sales_history": []
        }

    # 2. Find completed payments for these courses
    payments = db.query(PaymentModel).filter(
        PaymentModel.course_id.in_(my_course_ids),
        PaymentModel.status == "completed"
    ).all()

    total_sales = 0.0
    sales_history = []

    for p in payments:
        total_sales += p.amount
        
        # Find course title from cached list or DB
        course_title = next((c.title for c in my_courses if c.id == p.course_id), "Unknown")
        
        # Find student name
        student = db.query(UserModel).filter(UserModel.id == p.user_id).first()
        student_name = f"{student.first_name} {student.last_name}" if student else "Unknown Student"

        sales_history.append({
            "transaction_id": p.transaction_id,
            "course_title": course_title,
            "student_name": student_name,
            "amount": p.amount,
            "my_share": p.amount * 0.75,
            "date": p.payment_date
        })

    # 3. Calculate 75% Share
    net_earnings = total_sales * 0.75

    return {
        "total_sales": total_sales,
        "net_earnings": net_earnings,
        "sales_count": len(sales_history),
        "sales_history": sales_history
    }