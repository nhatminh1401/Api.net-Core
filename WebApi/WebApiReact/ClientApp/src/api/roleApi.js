import axios from "axios";
import API from "./API";

const roleApi = {
    addAsync: async (content) => {
        try {
            const result = await API.post(`/api/Role/AddRole`, content);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    // postAsync: async (content) => {
    //     try{
    //         const result = await API.post(`/api/Token`, content);
    //         return result;
    //     }
    //     catch (error)
    //     {
    //         console.log(error);
    //     }
    // },
    getAllAsync: async () => {
        try {
            const result = await API.get(`/api/Role`);
            return result;
        } catch (error) {
            console.error(error);
        }
     },
    updateAsync: async (content) => {
        try {
            const result = await API.put(`/api/Role`, content);
            return result;
        } catch (error) {
            console.log(error)
        }
    },
    getByIdAsync: async (id) => {
        try {
            const result = await API.get(`/api/Role/Get/${id}`);
            //const result = await API.get(`${END_POINT.DEPARMENT}/${id}`);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    deleteAsync: async (Id) => {
        try {
            const result = await API.delete(`/api/Role?id=${Id}`);
            return result;
        } catch (error) {
            console.error(error);
        }
    },

}
export default roleApi