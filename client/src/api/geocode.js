import axios from "axios";


const reverseGeoCode = (latlng) => {
    const openCageApiKey = import.meta.env.VITE_OPENCAGE_API_KEY
    return axios.get(`https://api.opencagedata.com/geocode/v1/json?key=${openCageApiKey}&q=${latlng[0]}%2C${latlng[1]}&pretty=1&no_annotations=1`);
};


export {
    reverseGeoCode
}