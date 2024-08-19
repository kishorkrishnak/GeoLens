import axios from '../axios/Axios'

const createLens = (lensData) => axios.post(`/lens/`, lensData);
const getLens = (lensId) => axios.get(`/lens/${lensId}`);
const getLenses = () => axios.get(`/lens`);

export {
    getLens,
    createLens,
    getLenses
}