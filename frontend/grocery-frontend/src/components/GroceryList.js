import React, { useState, useEffect } from "react";
import { getItems, addItem, updateItem, deleteItem, searchItems } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Modal } from "bootstrap"; // Import Bootstrap Modal
import "../index.css"; // Import custom styles

const GroceryList = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [newQuantity, setNewQuantity] = useState("");
    const [editItem, setEditItem] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedQuantity, setUpdatedQuantity] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedItems, setSelectedItems] = useState([]);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        fetchItems(page);
    }, [page]);

    useEffect(() => {
        const savedDarkMode = localStorage.getItem("darkMode") === "true";
        setDarkMode(savedDarkMode);
        if (savedDarkMode) document.body.classList.add("dark-mode");
    }, []);

    const fetchItems = async (page) => {
        try {
            const response = await getItems(page, 5);
            setItems(response.data.content || response.data);
            setFilteredItems(response.data.content || response.data);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error("Error fetching items:", error);
            setItems([]);
        }
    };

    const handleSearch = async (e) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);
        if (searchValue.trim()) {
            try {
                const response = await searchItems(searchValue, page, 5);
                setFilteredItems(response.data.content || []);
                setTotalPages(response.data.totalPages || 1);
            } catch (error) {
                console.error("Error searching items:", error);
                setFilteredItems([]);
            }
        } else {
            fetchItems(page);
        }
    };

    const handleAddItem = async () => {
        if (!newItem.trim()) {
            toast.error("Item name cannot be empty!");
            return;
        }
        if (newQuantity <= 0) {
            toast.error("Quantity must be greater than zero!");
            return;
        }

        try {
            await addItem({ name: newItem, quantity: parseInt(newQuantity, 10) });
            setNewItem("");
            setNewQuantity("");
            fetchItems(page);
            toast.success("Item added successfully!");
        } catch (error) {
            toast.error("Failed to add item");
        }
    };

    const handleEdit = (item) => {
        const confirmEdit = window.confirm(`Edit item: ${item.name}?`);
        if (!confirmEdit) return;

        setEditItem(item);
        setUpdatedName(item.name);
        setUpdatedQuantity(item.quantity);
    };

    const handleUpdate = async () => {
        if (!updatedName.trim()) {
            toast.error("Item name cannot be empty!");
            return;
        }
        if (updatedQuantity <= 0) {
            toast.error("Quantity must be greater than zero!");
            return;
        }

        try {
            await updateItem(editItem.id, { name: updatedName, quantity: parseInt(updatedQuantity, 10) });
            setEditItem(null);
            fetchItems(page);
            toast.success("Item updated successfully!");
        } catch (error) {
            toast.error("Failed to update item");
        }
    };

    const confirmDelete = (id) => {
        setDeleteItemId(id);
        const modalElement = document.getElementById("deleteConfirmModal");
        const modal = new Modal(modalElement);
        modal.show();
    };

    const handleDeleteConfirmed = async () => {
        try {
            await deleteItem(deleteItemId);
            setDeleteItemId(null);
            fetchItems(page);
            toast.success("Item deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete item");
        }
    };

    const toggleDarkMode = () => {
        setDarkMode((prev) => {
            const newMode = !prev;
            localStorage.setItem("darkMode", newMode);
            document.body.classList.toggle("dark-mode", newMode);
            return newMode;
        });
    };

    return (
        <div className="container">
            <h2 className="text-center my-4">Grocery List</h2>

            <button className="btn btn-dark my-3" onClick={toggleDarkMode}>
                {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            <div className="mb-3">
                <input 
                    type="text"
                    className="form-control"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search items..."
                />
            </div>

            <div className="input-group mb-3">
                <input 
                    type="text"
                    className="form-control"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Item name"
                />
                <input 
                    type="number"
                    className="form-control"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    placeholder="Quantity"
                />
                <button className="btn btn-primary" onClick={handleAddItem}>Add</button>
            </div>

            <ul className="list-group">
    {filteredItems.map((item) => (
        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editItem && editItem.id === item.id ? (
                <>
                    <input
                        type="text"
                        className="form-control me-2"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                    />
                    <input
                        type="number"
                        className="form-control me-2"
                        value={updatedQuantity}
                        onChange={(e) => setUpdatedQuantity(e.target.value)}
                    />
                    <button className="btn btn-success btn-sm" onClick={handleUpdate}>Save</button>
                    <button className="btn btn-secondary btn-sm ms-2" onClick={() => setEditItem(null)}>Cancel</button>
                </>
            ) : (
                <>
                    {item.name} ({item.quantity})
                    <div>
                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(item)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => confirmDelete(item.id)}>Delete</button>
                    </div>
                </>
            )}
        </li>
    ))}
</ul>

            <div className="mt-3">
                <button className="btn btn-secondary me-2"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                >
                    Previous
                </button>
                <span> Page {page + 1} of {totalPages} </span>
                <button className="btn btn-secondary ms-2"
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                    disabled={page + 1 >= totalPages}
                >
                    Next
                </button>
            </div>

            <div className="modal fade" id="deleteConfirmModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Deletion</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">Are you sure you want to delete this item?</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={handleDeleteConfirmed} data-bs-dismiss="modal">Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default GroceryList;
