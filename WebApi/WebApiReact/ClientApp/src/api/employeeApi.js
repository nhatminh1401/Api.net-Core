import API from "./API";
import { END_POINT } from "./endPoint";

const url = "/api/Employee";

const employeeApi = {
    getAllAsync: async () => {
        try {
            const result = await API.get(`${url}`);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    getByIdAsync: async (id) => {
        try {
            const result = await API.get(`/api/Employee/GetEmployeeByID/${id}`);
            //const result = await API.get(`${END_POINT.DEPARMENT}/${id}`);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    addAsync: async (content) => {
        try {
            const result = await API.post(`/api/Employee`, content);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    deleteAsync: async (employeeID) => {
        try {
            const result = await API.delete(`/api/Employee/${employeeID}`);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    updateAsync: async (content) => {
        try {
            const result = await API.put(`/api/Employee`, content);
            return result;
        } catch (error) {
            console.log(error)
        }
    }
}

export default employeeApi