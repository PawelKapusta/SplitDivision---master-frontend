import axios from "axios";

const authAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_URL,
    headers: {
        "Content-Type": "application/json",
    },
    transformRequest: [
        (data) => {
            return JSON.stringify(data);
        },
    ],
    transformResponse: [
        (data) => {
            return JSON.parse(data);
        },
    ],
});

authAxios.interceptors.request.use(
    (config) => {
        const jwt = localStorage.getItem("token");
        if (jwt) {
            config.headers["Authorization"] = `Bearer ${jwt}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default authAxios;
