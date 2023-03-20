import axios from "axios";
import API from "./API";

const userApi = {
    addAsync: async (content) => {
        try {
            const result = await API.post('/api/Token/signup', content);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
}
export default userApi