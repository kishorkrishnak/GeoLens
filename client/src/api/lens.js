import axios from "../axios/Axios";

const createLens = (lensData) => axios.post(`/lens/`, lensData);
const getLensCenterCoordinates = (lensId) =>
  axios.get(`/lens/${lensId}/center`);
const getLens = (lensId) => axios.get(`/lens/${lensId}`);
const updateLens = (lensId, lensData) => axios.put(`/lens/${lensId}`, lensData);
const deleteLens = (lensId) => axios.delete(`/lens/${lensId}`);
const likeLens = (lensId) => axios.post(`/lens/${lensId}/like`);
const dislikeLens = (lensId) => axios.delete(`/lens/${lensId}/like`);

const suggestCorrection = (lensId, correctionData) =>
  axios.post(`/lens/${lensId}/suggestion`, correctionData);
const getSuggestionsForLens = (lensId, params) =>
  axios.get(`/lens/${lensId}/suggestion`, {
    params,
  });

const deleteSuggestionFromLens = (lensId, suggestionId) =>
  axios.delete(`/lens/${lensId}/suggestion/${suggestionId}`);

const updateSuggestion = (lensId, suggestionId, suggestionData) =>
  axios.put(`/lens/${lensId}/suggestion/${suggestionId}`, suggestionData);

const getLenses = (params) => {
  return axios.get(`/lens`, {
    params,
  });
};

const addCommentToLens = (lensId, commentData) =>
  axios.post(`/lens/${lensId}/comments`, commentData);
const deleteCommentFromLens = (lensId, commentId) =>
  axios.delete(`/lens/${lensId}/comments/${commentId}`);
const getCommentsForLens = (lensId, params) =>
  axios.get(`/lens/${lensId}/comments`, {
    params,
  });

export {
  getLenses,
  getLens,
  createLens,
  deleteLens,
  updateLens,
  likeLens,
  getLensCenterCoordinates,
  addCommentToLens,
  deleteCommentFromLens,
  getCommentsForLens,
  getSuggestionsForLens,
  suggestCorrection,
  deleteSuggestionFromLens,
  dislikeLens,
 updateSuggestion
};
