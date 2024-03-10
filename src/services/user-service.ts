import axiosInstance from './config';

export const markUserValidation = (data: IUser) => {
  return axiosInstance.post(`/user/validation`, {email: data.email});
};

export const loginUser = (data: IUserLogin) => {
  return axiosInstance.put(`/user/login`, data);
};

export const loginUserWithGoogle = (data: IUser) => {
  return axiosInstance.post(`/user/login-google`, data);
};

export const createUser = (data: IUser) => {
  return axiosInstance.post(`/user/create`, data);
};

export const getLinkResetPassword = (data: any) => {
  return axiosInstance.put(`/user/reset-password`, data);
};
