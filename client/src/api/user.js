import axios from "../axios/Axios";

const updateUser = (userData) => axios.put(`/user/`, userData);

export { updateUser };
