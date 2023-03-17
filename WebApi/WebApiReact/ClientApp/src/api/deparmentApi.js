import API from "./API";
import { END_POINT } from "./endPoint";

const url = "https://localhost:5001/api/Department/GetDepartment";

const deparmentApi = {
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
            const result = await API.get(`https://localhost:5001/api/Department/GetDepartmentByID/${id}`);
            //const result = await API.get(`${END_POINT.DEPARMENT}/${id}`);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    addAsync: async (content) => {
        try {
            const result = await API.post(`https://localhost:5001/api/Department/AddDepartment`, content);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    deleteAsync: async (departmentId) => {
        try {
            const result = await API.delete(`https://localhost:5001/api/Department/DeleteDepartment?id=${departmentId}`);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    updateAsync: async (content, departmentId) => {
        try {
            const result = await API.put(`https://localhost:5001/api/Department/UpdateDepartment`, content, departmentId);
            return result;
        } catch (error) {
            console.log(error)
        }
    }
}

export default deparmentApi