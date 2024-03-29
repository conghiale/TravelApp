import axiosInstance from './config';

export const getDestinationTypes = () => {
  return axiosInstance.get(`/dtype/get-all`);
};

export const createDestination = (formData: FormData) => {
  return axiosInstance.postForm(`/dest/create`, formData);
};

export const getAllDestinationByRole = (
  role: string,
  uid: string | undefined,
) => {
  return axiosInstance.get(`/dest/get-all/${role}/${uid}`);
};

export const getDestinationById = (id: string) => {
  return axiosInstance.get(`/dest/get/${id}`);
};

export const updateDestination = (id: string, formData: FormData) => {
  return axiosInstance.putForm(`/dest/edit/${id}`, formData);
};

export const resubmitDestination = (data: any) => {
  return axiosInstance.put(`/dest/resubmit`, data);
};

export const getTopDestination = () => {
  return axiosInstance.get(`/dest/top`);
};

export const getDestinationPublic = () => {
  return axiosInstance.get(`/dest/get-all`);
};

export const getNearDestination = (latitude: number, longitude: number) => {
  return axiosInstance.get(`/dest/nearest/${latitude}/${longitude}`);
};

export const getWaitingDestination = () => {
  return axiosInstance.get(`/dest/waiting`);
};

export const waitingDestinationApproval = (id: string, accepted: boolean, reason?: string) => {
  return axiosInstance.post(`/dest/approval`, {id, accepted, reason});
};

export const getImagesByDestinationId = (id: string) => {
  return axiosInstance.get(`/dest/get-images/${id}`);
};

export const removeLoveDestination = (data: any) => {
  return axiosInstance.delete(`/love/remove`, data);
}
