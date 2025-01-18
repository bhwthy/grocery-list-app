import React, { useState, useEffect } from "react";
import GroceryList from "./components/GroceryList";
import Login from "./pages/Login";

function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        // Check if token is still valid when app starts (optional)
        if (!token) {
            localStorage.removeItem("token");
            setToken(null);
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from storage
        setToken(null);
    };

    return (
        <div className="container">
            <h1 className="text-center my-4">Grocery List App</h1>
            
            {token ? (
                <>
                    <button className="btn btn-danger my-3" onClick={handleLogout}>
                        Logout
                    </button>
                    <GroceryList />
                </>
            ) : (
                <Login setToken={setToken} />
            )}
        </div>
    );
}

export default App;