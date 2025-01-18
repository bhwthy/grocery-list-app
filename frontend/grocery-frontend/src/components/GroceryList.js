import React, { useState, useEffect } from "react";
import { getItems, addItem, updateItem, deleteItem } from "../services/api";

const GroceryList = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [newQuantity, setNewQuantity] = useState("");
    const [editItem, setEditItem] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedQuantity, setUpdatedQuantity] = useState("");

    // Fetch all grocery items on page load
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await getItems();
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const handleAddItem = async () => {
        if (!newItem.trim() || !newQuantity.trim()) return;
        await addItem({ name: newItem, quantity: parseInt(newQuantity, 10) });
        setNewItem("");
        setNewQuantity("");
        fetchItems();
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setUpdatedName(item.name);
        setUpdatedQuantity(item.quantity);
    };

    const handleUpdate = async () => {
        if (!updatedName.trim() || updatedQuantity <= 0) return;
        await updateItem(editItem.id, { name: updatedName, quantity: parseInt(updatedQuantity, 10) });
        setEditItem(null);
        fetchItems();
    };

    const handleDelete = async (id) => {
        await deleteItem(id);
        fetchItems();
    };

    return (
        <div>
            <h2>Grocery List</h2>
            <div>
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Enter item name"
                />
                <input
                    type="number"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    placeholder="Quantity"
                />
                <button onClick={handleAddItem}>Add</button>
            </div>

            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {editItem && editItem.id === item.id ? (
                            <>
                                <input
                                    type="text"
                                    value={updatedName}
                                    onChange={(e) => setUpdatedName(e.target.value)}
                                />
                                <input
                                    type="number"
                                    value={updatedQuantity}
                                    onChange={(e) => setUpdatedQuantity(e.target.value)}
                                />
                                <button onClick={handleUpdate}>Save</button>
                                <button onClick={() => setEditItem(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                {item.name} ({item.quantity})
                                <button onClick={() => handleEdit(item)}>Edit</button>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroceryList;
