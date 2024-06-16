import { TokenResponse } from '@/constants/Types';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
const ACC_TOKEN_KEY = process.env.EXPO_PUBLIC_ACCESS_TOKEN_KEY ?? " ";
const REF_TOKEN_KEY = process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY ?? " ";
const USER_ID = process.env.EXPO_PUBLIC_USER_ID ?? "";
const API_URL =process.env.EXPO_PUBLIC_API_URL ?? "";
//const API_URL ="https://0c90-31-223-52-113.ngrok-free.app";

const getAccessToken = async () => {
    return await SecureStore.getItemAsync(ACC_TOKEN_KEY);
};

const getRefreshToken = async () => {
    return await SecureStore.getItemAsync(REF_TOKEN_KEY);
};

const saveTokens = async (accessToken: string, refreshToken: string) => {
    await SecureStore.setItemAsync(ACC_TOKEN_KEY, accessToken);
    await SecureStore.setItemAsync(REF_TOKEN_KEY, refreshToken);
};

const apiClient = axios.create({
    baseURL: API_URL,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

apiClient.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
            return new Promise(function (resolve, reject) {
                failedQueue.push({ resolve, reject });
            }).then(token => {
                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                return axios(originalRequest);
            }).catch(err => {
                return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = await getRefreshToken();
        return new Promise(function (resolve, reject) {
            axios.post(`${API_URL}/Auth/refreshtokenlogin`, { refreshToken })
                .then(({ data }) => {
                    saveTokens(data.token.accessToken, data.token.refreshToken);
                    apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + data.token.accessToken;
                    originalRequest.headers['Authorization'] = 'Bearer ' + data.token.accessToken;
                    processQueue(null, data.token.accessToken,);
                    resolve(axios(originalRequest));
                })
                .catch((err) => {
                    processQueue(err, null);
                    reject(err);
                })
                .finally(() => { isRefreshing = false });
        });
    }

    return Promise.reject(error);
});

export const logout = async () => {
    await SecureStore.deleteItemAsync(ACC_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REF_TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_ID);
};

// auth controller
export const loginWithGoogle = async (idToken: string) => {
    const response = await apiClient.post('/Auth/google-login', { idToken });
    return response.data;
};
export const refreshToken = async (refreshToken: string) => {
    const response = await apiClient.post('/Auth/RefreshTokenLogin', { refreshToken });
    return response.data;
};

// user controller

export const getUserWithId = async (id: number) => {
    try {
        const response = await apiClient.get('/Users/GetUserWithId?UserId=' + id);
        return response.data;
    } catch (error) {       
        console.warn("user id bulunamadi");
    }
};

export default apiClient;
