import axios from '../axios/Axios'


const googleAuth = (code) => axios.get(`/auth/google?code=${code}`);
const verifyToken = () => axios.get(`/auth/verify`);
const logoutUser = () => axios.post(`/auth/logout`);

export {
    googleAuth, verifyToken, logoutUser
}