import axios from '../axios/Axios'

const createLens = (lensData) => axios.post(`/lens/`, lensData);

export {
    createLens
}