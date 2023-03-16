import axios from 'axios';
let API_URL = "https://localhost:44375/api/Employee/";
export function callApi(endpoint, method = 'GET', body) {
    return axios({
        method,
        url: `${API_URL}/${endpoint}`,
        data: body,
    }).catch(e => {
        console.log(e)
    })
}

export function GET_ALL_PRODUCTS(endpoint) {
    return callApi(endpoint, "GetEmployee");
}
export function GET_PRODUCT_ID(endpoint, id) {
    return callApi(endpoint + "/" + id, "GET");
}
export function POST_ADD_Employee(endpoint, data) {
    return callApi(endpoint, "POST", data);
}
export function PUT_EDIT_PRODUCT(endpoint, data) {
    return callApi(endpoint, "PUT", data);
}
export function DELETE_PRODUCT_ID(endpoint) {
    return callApi(endpoint, "DELETE");
}
export function GET_ALL_CATEGORIES(endpoint) {
    return callApi(endpoint, "GET");
}
//https://localhost:44375/api/Employee/GetEmployee
//https://localhost:44375/api/Department/GetDepartment