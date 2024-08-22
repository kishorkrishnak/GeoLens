import axios from '../axios/Axios'

const createLens = (lensData) => axios.post(`/lens/`, lensData);
const getLensCenterCoordinates = (lensId) => axios.get(`/lens/${lensId}/center`);
const getLens = (lensId) => axios.get(`/lens/${lensId}`);
const updateLens = (lensId, lensData) => axios.put(`/lens/${lensId}`, lensData);
const deleteLens = (lensId) => axios.delete(`/lens/${lensId}`);

const getLenses = (params) => {
    return axios.get(`/lens`, {
        params
    });
};

const addCommentToLens = (lensId, commentData) => axios.post(`/lens/${lensId}/comments`, commentData);
const deleteCommentFromLens = (lensId, commentId) => axios.delete(`/lens/${lensId}/comments/${commentId}`);
const getCommentsForLens = (lensId, params) => axios.get(`/lens/${lensId}/comments`, {
    params
});

export {
    getLenses,
    getLens,
    createLens,
    deleteLens,
    updateLens,
    getLensCenterCoordinates,
    addCommentToLens,
    deleteCommentFromLens,
    getCommentsForLens
};