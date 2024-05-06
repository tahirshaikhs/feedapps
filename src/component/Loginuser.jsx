import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Loginuser.css';
import CustomNavbar from "./Navbar";
import Footer from "./Footer";


function Loginuser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        // Validate inputs
        if (!username.trim()) {
            setError("Username cannot be empty.");
            return;
        }
        if (!password.trim()) {
            setError("Password cannot be empty.");
            return;
        }
        
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
                    setError("Incorrect Password or User not found.");
                }
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <>
            <CustomNavbar />
           
           {error && <div className="btn btn-danger text-white">{error}</div>}
            <form className="container" onSubmit={handleSubmit}>
                <div className="row d-flex justify-content-center">
                <div className="col-md-9">
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="USERNAME" />
            <br />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="PASSWORD" />
                        <br />
                        </div>
            <div className="btn-main col-md-8">
            <div className="btn-container">
                <button type="submit">LOGIN</button>
            </div>
            <div className="btn-register">
                <Link to="/">REGISTER</Link>
                </div>
                </div>
                    
                </div>
              
            </form>
            <Footer/>
               
            </>
    );
}

export default Loginuser;
