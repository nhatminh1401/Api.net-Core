import API from "./API";
import { END_POINT } from "./endPoint";

const url = "/api/Department/GetDepartment";

const deparmentApi = {
    getAllAsync: async () => {
        try {
            const result = await API.get(`/api/Department`);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    getByIdAsync: async (id) => {
        try {
            const result = await API.get(`/api/Department/GetDepartmentByID/${id}`);
            //const result = await API.get(`${END_POINT.DEPARMENT}/${id}`);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    addAsync: async (content) => {
        try {
            const result = await API.post(`/api/Department/AddDepartment`, content);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    deleteAsync: async (departmentId) => {
        try {
            const result = await API.delete(`/api/Department/${departmentId}`);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    updateAsync: async (content, departmentId) => {
        try {
            const result = await API.put(`/api/Department`, content, departmentId);
            return result;
        } catch (error) {
            console.log(error)
        }
    }
}

export default deparmentApi