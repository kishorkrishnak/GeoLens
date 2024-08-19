import axios from '../axios/Axios'

const createLens = (lensData) => axios.post(`/lens/`, lensData);
const getLens = (lensId) => axios.get(`/lens/${lensId}`);
const getLenses = (params) => {
    return axios.get(`/lens`, {
        params: params,
    });
};

export {
    getLens,
    createLens,
    getLenses
}