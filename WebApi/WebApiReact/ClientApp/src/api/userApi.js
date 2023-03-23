import axios from "axios";
import API from "./API";

const userApi = {
    addAsync: async (content) => {
        try {
            const result = await API.post(`/api/Token/signup`, content);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    postAsync: async (content) => {
        try{
            const result = await API.post(`/api/Token`, content);
            return result;
        }
        catch (error)
        {
            console.log(error);
        }
    },
    getAllAsync: async () => {
        try {
            const result = await API.get(`/api/Token`);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    updateAsync: async (content) => {
        try {
            const result = await API.put(`/api/Token/UpdateUser`, content);
            return result;
        } catch (error) {
            console.log(error)
        }
    },
    getByIdAsync: async (id) => {
        try {
            const result = await API.get(`/api/Token/${id}`);
            //const result = await API.get(`${END_POINT.DEPARMENT}/${id}`);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    deleteAsync: async (Id) => {
        try {
            const result = await API.delete(`/api/Token/DeleteUser?id=${Id}`);
            return result;
        } catch (error) {
            console.error(error);
        }
    },

}
export default userApi