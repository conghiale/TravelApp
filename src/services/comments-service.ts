import axiosInstance from './config';

export const getCommentByDestinationId = (id: string) => {
  return axiosInstance.get(`/comment/comments/${id}`);
};

export const createComment = (
  userId: string,
  destinationId: string,
  content: string,
  star: number,
) => {
  return axiosInstance.post(`/comment/create`, {
    userId,
    destinationId,
    content,
    star,
  });
};

export const deleteCommentById = (id: string) => {
  return axiosInstance.delete(`/comment/delete/${id}`);
};

export const updateCommentById = (
  id: string,
  content: string,
  star: number,
) => {
  return axiosInstance.put(`/comment/edit/${id}`, {content, star});
};

//love
export const checkUserLoveDestination = (userId: string, destId: string) => {
  return axiosInstance.get(`/love/check/${userId}/${destId}`);
};

export const toggleLoveDestination = (data: any) => {
  return axiosInstance.post(`/love/toggle`, data);
};
