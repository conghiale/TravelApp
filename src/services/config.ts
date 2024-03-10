import axios from 'axios'
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

export const TRAVEL_TOKEN_NAME = 'travel_user_token'
export const BASE_URL = 'http://localhost:1702'
export const BASE_URL_AVATAR = 'http://localhost:1702/resources/avatar'
export const BASE_URL_DESTINATION = 'http://localhost:1702/resources/destination'
export const TIME_OUT = 30000
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
})

export const saveToken = async (key: string, value: string) => {
    try {
        // await SecureStore.setItemAsync(key, value)
        await RNSecureStorage.setItem(key, value, {accessible: ACCESSIBLE.WHEN_UNLOCKED});
    } catch (error) {
        console.log('Internal error in saveToken:', error)
        return {
            message: 'Internal error in saveToken',
        }
    }
}

axiosInstance.interceptors.request.use(async (req) => {
    try {
        // const access_token = await SecureStore.getItemAsync("travel_user_token")
        const access_token = await RNSecureStorage.getItem(TRAVEL_TOKEN_NAME);
        req.headers.Authorization = access_token
        return req
    } catch(error) {
        return req
    }
})

export const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data)

export default axiosInstance