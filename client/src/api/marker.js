import axios from '../axios/Axios'

const createMarker = (markerData) => axios.post(`/marker/`, markerData);
const deleteMarker = (markerId) => axios.delete(`/marker/${markerId}`);
const updateMarker = (markerId,markerData) => axios.put(`/marker/${markerId}`, markerData);

export {
    createMarker
    , deleteMarker, updateMarker
}