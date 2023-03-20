import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
    baseURL: 'https://localhost:5001/'
}

class RequestService {
    public axios: AxiosInstance;

    constructor() {
        this.axios = axios.create(config);
    }
    
    public setAuthentication(token: string) {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}

export default new RequestService();
