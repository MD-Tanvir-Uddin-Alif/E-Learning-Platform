import { api } from './axios';

export const registerUser = (formData) =>
  api.post('auth/register', formData).then((r) => r.data);