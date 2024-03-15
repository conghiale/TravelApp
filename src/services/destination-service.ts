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

export const getTopDestination = () => {
  return axiosInstance.get(`/dest/top`);
};

export const getDestinationPublic = () => {
  return axiosInstance.get(`/dest/get-all`);
};

export const getNearDestination = (latitude: number, longitude: number) => {
  return axiosInstance.get(`/dest/nearest/${latitude}/${longitude}`);
};

export const getRecommendDestination = () => {
  return axiosInstance.get(`/dest/recommend`);
};
