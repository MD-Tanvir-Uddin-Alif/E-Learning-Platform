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