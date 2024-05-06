import React, { useState, useEffect } from "react";
import CustomNavbar from "../component/Navbar";
import Alert from 'react-bootstrap/Alert';
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";


function Profile() {
    const [userPosts, setUserPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (!username) {
            setIsLoggedIn(false);
            return;
        }

        fetch(`http://localhost:3000/register?name=${username}`)
            .then(response => response.json())
            .then(data => setUserPosts(data))
            .catch(error => console.error("Error fetching user posts:", error));
    }, []);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
           <CustomNavbar/>
            <div className="container-lg mt-5 ">
                <div className=" row justify-content-center ">
                    <div className="card col bg-primary" >
                        {isLoggedIn ? (
                            userPosts.map(post => (
                                <div key={post.id} className="col ">
                                    <div className="card-body bg-light rounded">
                                        <p>Name: {post.name}</p>
                                        <p>Email: {post.email}</p>
                                        <p>Phone: {post.phone}</p>
                                        <div className="password-group">
                                            <p>Password: {showPassword ? post.password : "********"}
                                                <span onClick={togglePasswordVisibility} className="eye-icon" style={{ marginLeft: "10px" }} >
                                                    {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-md-5 col-lg-12">
                                <Link to="/login">
                                    <Alert variant="danger" className="d-inline-block">
                                        Please login first!
                                    </Alert>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Profile;
