import axios from '../axios/Axios'

const createLens = (lensData) => axios.post(`/lens/`, lensData);
const getLensCenterCoordinates = (lensId) => axios.get(`/lens/${lensId}/center`);
const getLens = (lensId) => axios.get(`/lens/${lensId}`);
const updateLens = (lensId, lensData) => axios.put(`/lens/${lensId}`, lensData);
const deleteLens = (lensId) => axios.delete(`/lens/${lensId}`);

const getLenses = (params) => {
    return axios.get(`/lens`, {
        params: params,
    });
};

export {
    getLenses,
    getLens,
    createLens,
    deleteLens,
    updateLens, getLensCenterCoordinates
}