import axios from "axios";

const API = axios.create({
    baseURL: "https://localhost:5001",
    timeout: 300000,
    headers: {
        "Content-Type": "application/json",
        //"Authorization" : `Bearer ${token}`
    },
});

API.interceptors.response.use(
    (respose) => {
        return respose.data
    },
    (error) => {
        console.log(error);
    }
)

API.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem("token");//store.getState().session.token;
    config.headers.Authorization = `Bearer ${token}`;
    //console.log('>>>>>>token:',token);
     
    return config;
});

export default API;
