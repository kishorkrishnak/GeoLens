import axios from "axios";

const reverseGeoCode = (latlng) => {
    const openCageApiKey = import.meta.env.VITE_OPENCAGE_API_KEY
    return axios.get(`https://api.opencagedata.com/geocode/v1/json?key=${openCageApiKey}&q=${latlng[0]}%2C${latlng[1]}&pretty=1&no_annotations=1`);
};

const getWeatherData = (lat, lng) => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_KEY}&q=${lat},${lng}&days=10&aqi=no&alerts=no`;
    return axios.get(url);

}

export {
    reverseGeoCode, getWeatherData
}