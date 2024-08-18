import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const googleAuth = (code) => api.get(`/auth/google?code=${code}`);
export const verifyToken = () => api.get(`/auth/verify`);
export const logoutUser = () => api.post(`/auth/logout`);