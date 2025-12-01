from fastapi import APIRouter

from models.video_progress_model import VideoProgressModel
from models.course_model import CourseModel
from models.video_model import VideoModel
from models.enrollment_model import EnrollmentModel


router = APIRouter(tags=["Instructor"])