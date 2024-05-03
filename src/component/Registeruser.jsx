import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Registeruser.css'

function Registeruser() {
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

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
         <form className="container" onSubmit={handleSubmit}>
           
           
           
            <input type="text" value={name} onChange={e => setName(e.target.value)}  placeholder="USERNAME" />
            {errors.name && <div>{errors.name}</div>}
            <br />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}  placeholder="PASSWORD"  />
            {errors.password && <div>{errors.password}</div>}
            <br/>
             <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="EMAIL ID"  />
            {errors.email && <div>{errors.email}</div>}
            <br />
        
            <input type="number" value={phone} onChange={e => setPhone(e.target.value)} placeholder="PHONE NO."  />
            {errors.phone && <div>{errors.phone}</div>}
            <br />
         
            
        
            
            <select name="role" value={role} onChange={e => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            {errors.role && <div>{errors.role}</div>}
            <br /> <div className="btn-side">
                <div className="loginnext">
                    <Link to="/login">LOGIN</Link>
                </div>
                <div>
                    <button type="submit" id="submit">REGISTER</button>
                    </div>
            
            </div>
           
        </form>
    );
}

export default Registeruser;
