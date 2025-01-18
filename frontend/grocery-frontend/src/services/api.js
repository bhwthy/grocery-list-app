import axios from 'axios'

const API_URL = "http://localhost:8080/api/auth";

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
    try {
        const response = await axios.get(`${API_URL}?page=${page}&size=${size}`, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error.response ? error.response.data : error.message);
        throw error;
    }
};



export const addItem = (item) => 
    axios.post(`${API_URL}/grocery`, item, getAuthHeader());

export const updateItem = (id, item) => 
    axios.put(`${API_URL}/grocery/${id}`, item, getAuthHeader());

export const deleteItem = (id) => 
    axios.delete(`${API_URL}/grocery/${id}`, getAuthHeader());

export const searchItems = (keyword, page = 0, size = 10) =>
    axios.get(`http://localhost:8080/api/grocery/search?keyword=${keyword}&page=${page}&size=${size}`);


