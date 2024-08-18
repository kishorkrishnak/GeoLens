import axios from '../axios/Axios'


export const googleAuth = (code) => axios.get(`/auth/google?code=${code}`);
export const verifyToken = () => axios.get(`/auth/verify`);
export const logoutUser = () => axios.post(`/auth/logout`);