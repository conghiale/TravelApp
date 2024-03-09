import axiosInstance, { BASE_URL } from "./config"

export const loginUser = (data: IUser) => {
    return axiosInstance.post(`${BASE_URL}/user/login`, data)
}

export const loginUserWithGoogle = (data: IUser) => {
    return axiosInstance.post(`${BASE_URL}/user/login-google`, data)
}

export const registerUser = (data: IUser) => {
    return axiosInstance.post(`${BASE_URL}/user/create`, data)
}