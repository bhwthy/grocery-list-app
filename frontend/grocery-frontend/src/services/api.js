import axios from 'axios'

const API_URL = "http://localhost:8080/api/grocery"

// Get all grocery items
export const getItems = () => axios.get(API_URL);

// Add a new grocery item
export const addItem = (item) => axios.post(API_URL, item);

// Update a grocery item
export const updateItem = (id, item) => axios.put(`${API_URL}/${id}`, item);

// Delete a grocery item
export const deleteItem = (id) => axios.delete(`${API_URL}/${id}`);