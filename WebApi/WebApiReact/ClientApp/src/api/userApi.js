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
    getAllAsync: async (emailId) => {
        try {
            const result = await API.get(`/api/Token`, emailId);
            return result;
        } catch (error) {
            console.error(error);
        }
    },

}
export default userApi