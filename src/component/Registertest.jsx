import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Registeruser.css'
import CustomNavbar from "./Navbar";



function RegisterTest() {
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
        if (e.target.value.trim()) {
            setErrors(prevErrors => ({ ...prevErrors, name: "" }));
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (e.target.value.trim() && /\S+@\S+\.\S+/.test(e.target.value)) {
            setErrors(prevErrors => ({ ...prevErrors, email: "" }));
        }
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
        if (e.target.value.trim() && e.target.value.length === 10) {
            setErrors(prevErrors => ({ ...prevErrors, phone: "" }));
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value.trim() && e.target.value.length >= 6) {
            setErrors(prevErrors => ({ ...prevErrors, password: "" }));
        }
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
        if (e.target.value.trim()) {
            setErrors(prevErrors => ({ ...prevErrors, role: "" }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};
       
        if (!name.trim()) {
            errors.name = "Name is required";
        }
        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }
        if (!phone.trim()) {
            errors.phone = "Phone Number is required";
        } else if (phone.length !== 10) {
            errors.phone = "Phone Number must be 10 digits";
        }
        if (!password.trim()) {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
        if (!role.trim()) {
            errors.role = "Role is required";
        }
        
        if (Object.keys(errors).length === 0) {
            const empdata = {name, email, phone, password, role };
            fetch("http://localhost:3000/register", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(empdata)
            }).then(() => {
                alert("Register successfully");
                navigate("/login");
            }).catch((error) => {
                console.log(error.message);
            });
        } else {
            setErrors(errors);
        }
    };
    
    return (
    
        <>
            <CustomNavbar/>
        <form className="container " onSubmit={handleSubmit}>
        <div className="row d-flex justify-content-center">
            <div className="col-md-10">
                <div className="form-group">
                    <input 
                        type="text" 
                        className={`form-control ${errors.name ? "is-invalid" : name ? "is-valid" : ""}`} 
                        value={name} 
                        onChange={handleNameChange}  
                        placeholder={errors.name ? errors.name : "First Name"} 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        className={`form-control ${errors.password ? "is-invalid" : password ? "is-valid" : ""}`} 
                        value={password} 
                        onChange={handlePasswordChange}  
                        placeholder={errors.password ? errors.password : "PASSWORD"}  
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        className={`form-control ${errors.email ? "is-invalid" : email ? "is-valid" : ""}`} 
                        value={email} 
                        onChange={handleEmailChange} 
                        placeholder={errors.email ? errors.email : "EMAIL ID"}  
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="number" 
                        className={`form-control ${errors.phone ? "is-invalid" : phone ? "is-valid" : ""}`} 
                        value={phone} 
                        onChange={handlePhoneChange} 
                        placeholder={errors.phone ? errors.phone : "PHONE NO."}  
                    />
                </div>
            </div>
            <div className="col-md-10">
                <div className="form-group">
                    <select 
                        name="role" 
                        className={`form-control ${errors.role ? "is-invalid" : role ? "is-valid" : ""}`} 
                        value={role} 
                        onChange={handleRoleChange}
                    >
                        <option value="">Select Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="btn-side">
                    <div className="loginnext">
                        <Link to="/login">LOGIN</Link>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">REGISTER</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
    </>
    
    

    

     
    );
}

export default RegisterTest;
