import axiosInstance from './config';
// auth
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

// user
export const getUserById = (id: string) => {
  return axiosInstance.get(`/user/get/${id}`);
};

export const getLinkResetPassword = (data: any) => {
  return axiosInstance.put(`/user/reset-password`, data);
};

export const updateUserById = (id: string, data: any) => {
  return axiosInstance.put(`/user/edit/${id}`, data);
};

export const uploadAvatar = (userId: string, formData: FormData) => {
  return axiosInstance.postForm(`user/upload-avatar/${userId}`, formData)
}

//love list
export const getAllLoveListByUser = (userId: string, isAsc: boolean) => {
  return axiosInstance.get(`/love/${userId}/${isAsc ? 'asc' : 'desc'}`);
};

export const addLoveDestination = (userId: string, destId: string) => {
  return axiosInstance.post(`/love/add`, {userId, destId});
};

export const deleteLoveDestination = (userId: string, destId: string) => {
  return axiosInstance.delete(`/love/remove/${userId}/${destId}`);
};

//hobby
export const getAllHobbyByUserId = (id: string) => {
  return axiosInstance.get(`/user/hobby/${id}`);
};

//password
export const changePassword = (data: any) => {
  return axiosInstance.post(`/user/change-password`, data);
};

//admin
export const getAllUserExceptAdmin = () => {
  return axiosInstance.get(`/user/get-all`);
};

export const lockUserByEmail = (email: string) => {
  return axiosInstance.post(`/user/lock`, {email});
}
