import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'

function CustomNavbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user session data
        localStorage.removeItem("username");
        // Redirect to login page
        navigate("/login");
    };

    return (
        <div className="fixed-component">
            <Navbar bg="primary" expand="lg">
                <Nav className="mx-auto">
                    <Nav.Item>
                        <Navbar.Brand as={Link} to="/" className="text-white">FeedApp</Navbar.Brand>
                    </Nav.Item>
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Item>
                            <Nav.Link onClick={handleLogout} className="text-white">LOGOUT</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default CustomNavbar;
