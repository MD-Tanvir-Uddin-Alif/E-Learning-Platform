import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/';

// for JSON 
export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// for file uploads 
export const apiMultipart = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// --- Category API ---
export const createCategory = async (categoryData) => {
  const response = await api.post('/admin/create-category', categoryData);
  return response.data;
};

// Get All
export const getAllCategories = () => 
  api.get('/public/all-categories').then((r) => r.data);


// Update
export const updateCategory = (id, data) => 
  api.put(`/admin/update-category/${id}`, data).then((r) => r.data);

// Delete
export const deleteCategory = (id) => 
  api.delete(`/admin/delete-category/${id}`).then((r) => r.data);


// --------------Course API--------------
// Create a new course
export const createCourse = (formData) => 
  apiMultipart.post('/instructor/create-course', formData).then((r) => r.data);


// Add videos to a course
export const addVideosToCourse = (courseId, formData) => 
  apiMultipart.post(`/instructor/courses/${courseId}/add-video`, formData).then((r) => r.data);

// Fetch details of a specific course
export const getCourseDetails = (courseId) =>
  api.get(`/instructor/courses/${courseId}`).then((r) => r.data);

// Fetch all courses created by the logged-in instructor
export const getMyCourses = () => 
  api.get('/instructor/my-courses').then((r) => r.data);







//---------Admin manage user-----------------


// Fetch all users
export const getAllUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};


// Block a user
export const blockUser = async (userId) => {
  const response = await api.put(`/admin/users/${userId}/block`);
  return response.data;
};

// Unblock a user
export const unblockUser = async (userId) => {
  const response = await api.put(`/admin/users/${userId}/unblock`);
  return response.data;
};

// Interceptor Logic
const authInterceptor = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// 3. Attach the interceptor to BOTH instances
api.interceptors.request.use(authInterceptor, (error) => Promise.reject(error));
apiMultipart.interceptors.request.use(authInterceptor, (error) => Promise.reject(error));