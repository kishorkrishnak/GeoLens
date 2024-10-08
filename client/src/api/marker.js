import axios from "../axios/Axios";

const createMarker = (markerData) => axios.post(`/marker/`, markerData);
const deleteMarker = (markerId) => axios.delete(`/marker/${markerId}`);
const updateMarker = (markerId, markerData) =>
  axios.put(`/marker/${markerId}`, markerData);
const likeMarker = (markerId) => axios.post(`/marker/${markerId}/like`);
const dislikeMarker = (markerId) => axios.delete(`/marker/${markerId}/like`);
export { createMarker, deleteMarker, updateMarker, likeMarker, dislikeMarker };
