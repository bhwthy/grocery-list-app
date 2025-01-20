import axios from 'axios'

const API_URL = "http://localhost:8080/api/grocery";  // ✅ Correct endpoint for grocery items
const AUTH_URL = "http://localhost:8080/api/auth";   // ✅ Authentication endpoints

export const login = async (username, password) => {
    return axios.post(`${API_URL}/login`, { username, password });
};

export const signup = async (username, password) => {
    return axios.post(`${API_URL}/signup`, { username, password });
};

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const getItems = async (page = 0, size = 5) => {
    return axios.get(`${API_URL}?page=${page}&size=${size}`, getAuthHeader());  // ✅ Uses /api/grocery, not /api/auth
};


export const addItem = async (item) => {
    return axios.post(API_URL, item, getAuthHeader());  // ✅ Corrected path
};

export const updateItem = async (id, item) => {
    return axios.put(`${API_URL}/${id}`, item, getAuthHeader());  // ✅ Corrected path
};

export const deleteItem = async (id) => {
    return axios.delete(`${API_URL}/${id}`, getAuthHeader());  // ✅ Corrected path
};

export const searchItems = async (query) => {
    return axios.get(`${API_URL}/search`, {
        params: { query },
        ...getAuthHeader()
    });
};
