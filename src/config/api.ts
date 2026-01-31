import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { config } from "./index";

// Buat instance axios dengan konfigurasi default
const api: AxiosInstance = axios.create({
    baseURL: config.api.baseUrl,
    timeout: config.api.timeout,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
    (requestConfig) => {
        const token = Cookies.get(config.auth.tokenKey);
        if (token) {
            requestConfig.headers.Authorization = `Bearer ${token}`;
        }
        return requestConfig;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor untuk handle response error
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            Cookies.remove(config.auth.tokenKey);
            Cookies.remove(config.auth.roleKey);
            if (typeof window !== "undefined") {
                window.location.href = config.routes.login;
            }
        }
        return Promise.reject(error);
    }
);

// Helper functions untuk HTTP methods
export const apiGet = <T>(url: string, config?: AxiosRequestConfig) =>
    api.get<T>(url, config);

export const apiPost = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    api.post<T>(url, data, config);

export const apiPut = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    api.put<T>(url, data, config);

export const apiDelete = <T>(url: string, config?: AxiosRequestConfig) =>
    api.delete<T>(url, config);

export default api;
