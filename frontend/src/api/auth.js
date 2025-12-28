import { api, apiMultipart } from './axios';

export const registerUser = (formData) =>
  apiMultipart.post('/auth/register', formData)
     .then((r) => r.data)
     .catch((err) => {
       console.log('---- axios error ----');
       console.log('status :', err.response?.status);
       console.log('data   :', err.response?.data);
       console.log('headers:', err.response?.headers);
       throw err;
     });



export const loginUser = (credentials) =>
  api.post('/auth/login', credentials).then((r) => r.data);




export const forgotPassword = (email) =>
  api.post('/auth/forgot-password', { email }).then((r) => r.data);

export const resetPassword = (data) =>
  api.post('/auth/reset-password', data).then((r) => r.data);



// --- User Profile ---
export const getMyProfile = () =>
  api.get('/user/me').then((r) => r.data);

export const updateProfile = (formData) =>
  apiMultipart.put('/user/profile', formData).then((r) => r.data);

export const changePassword = (data) =>
  api.post('/auth/change-password', data).then((r) => r.data);