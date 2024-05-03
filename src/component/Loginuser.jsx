import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Loginuser.css';
import CustomNavbar from "./Navbar";

function Loginuser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch("http://localhost:3000/register")
            .then((response) => response.json())
            .then((data) => {
                const foundUser = data.find(user => user.name === username && user.password === password);
                if (foundUser) {
                    localStorage.setItem("username", foundUser.name);
                    if (foundUser.role === "admin") {
                        navigate("/admin");
                    } else {
                        navigate("/welcome");
                    }
                } else {
                    setError("User not found. Please register first.");
                }
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <>
           <CustomNavbar/>
            <div>
        <form className="container" onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="USERNAME" />
            <br />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="PASSWORD" />
            <br />
            <div className="btn-main">
            <div className="btn-container">
                <button type="submit">LOGIN</button>
            </div>
            <div className="btn-register">
                <Link to="/">REGISTER</Link>
                </div>
                </div>
            {error && <div>{error}</div>}
                </form>
                </div>
            </>
    );
}

export default Loginuser;
