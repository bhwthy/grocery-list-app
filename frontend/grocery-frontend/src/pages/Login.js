import React, { useState } from "react";
import { login, signup } from "../services/api";

const Login = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSignup, setIsSignup] = useState(false);

    const handleAuth = async () => {
        try {
            const response = isSignup ? await signup(username, password) : await login(username, password);
            const token = response.data.token;
            localStorage.setItem("token", token);
            setToken(token);
        } catch (error) {
            alert("Invalid username or password");
        }
    };

    return (
        <div className="container">
            <h2>{isSignup ? "Signup" : "Login"}</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleAuth}>{isSignup ? "Signup" : "Login"}</button>
            <p onClick={() => setIsSignup(!isSignup)} style={{ cursor: "pointer" }}>
                {isSignup ? "Already have an account? Login" : "No account? Signup"}
            </p>
        </div>
    );
};

export default Login;
