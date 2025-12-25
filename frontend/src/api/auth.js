import { api } from './axios';

export const registerUser = (formData) =>
  api.post('auth/register', formData)
     .then((r) => r.data)
     .catch((err) => {
       console.log('---- axios error ----');
       console.log('status :', err.response?.status);
       console.log('data   :', err.response?.data);
       console.log('headers:', err.response?.headers);
       throw err;
     });