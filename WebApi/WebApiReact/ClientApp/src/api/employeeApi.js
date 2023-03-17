import API from "./API";
import { END_POINT } from "./endPoint";

const url = "https://localhost:5001/api/Employee/GetEmployee";

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
            const result = await API.get(`https://localhost:5001/api/Employee/GetEmployeeByID/${id}`);
            //const result = await API.get(`${END_POINT.DEPARMENT}/${id}`);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    addAsync: async (content) => {
        try {
            const result = await API.post(`https://localhost:5001/api/Employee/AddEmployee`, content);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    deleteAsync: async (employeeID) => {
        try {
            const result = await API.delete(`https://localhost:5001/api/Employee/DeleteEmployee?id=${employeeID}`);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    updateAsync: async (content) => {
        try {
            const result = await API.put(`https://localhost:5001/api/Employee/UpdateEmployee`, content);
            return result;
        } catch (error) {
            console.log(error)
        }
    }
}

export default employeeApi