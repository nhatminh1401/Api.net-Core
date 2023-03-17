import axios from "axios";
import API from "./API";

const userApi = {
    addAsync: async (content) => {
        try {
            const result = await API.post('https://localhost:5001/api/Users/signup', content);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
}
export default userApi