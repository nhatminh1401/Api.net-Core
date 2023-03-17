import axios from "axios";

const API = axios.create({
    baseURL: "https://localhost:5001",
    timeout: 300000,
    headers: {
        "Content-Type": "application/json",
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

export default API;
