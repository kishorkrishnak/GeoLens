import axios from "../axios/Axios";

const updateUser = (userData) => axios.put(`/user/`, userData);
const fetchUserProfile = (userId) => axios.get(`/user/${userId}`);

export { updateUser ,fetchUserProfile };
