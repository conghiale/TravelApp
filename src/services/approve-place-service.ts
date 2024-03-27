import axiosInstance from './config';

export const getApprovePlaceByDestinationId = (id: string) => {
  return axiosInstance.get(`/approvePlace/approves/${id}`);
};

export const getAllApprovePlace = () => {
  return axiosInstance.get(`/approvePlace/approves`);
};

export const createApprovePlace = (
  userId: string[],
  destinationId: string,
  status: number,
) => {
  return axiosInstance.post(`/approvePlace/create`, {
    userId,
    destinationId,
    status,
  });
};

export const deleteApprovePlaceById = (id: string) => {
  return axiosInstance.delete(`/approvePlace/delete/${id}`);
};

export const deleteApprovedPlaceByDestinationId = (id: string) => {
  return axiosInstance.delete(`/approvePlace//deleteByDestinationId/${id}`);
};

export const updateApprovePlaceById = (
  id: string,
  userId: string[],
) => {
  return axiosInstance.put(`/approvePlace/edit/${id}`, { userId });
};

export const updateUsersByDestinationId = (
  destinationId: string,
  userId: string,
) => {
  return axiosInstance.put(`/approvePlace/editUsers/${destinationId}`, { userId });
};

export const updateStatusByDestinationId = (
  destinationId: string,
  status: number,
) => {
  return axiosInstance.put(`/approvePlace/editStatus/${destinationId}`, { status });
};
