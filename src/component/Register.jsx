import React, { useState, useEffect } from 'react';
import './RegisterPage.css';

// Importing the user.json file with a default empty array if the file is empty
import userData from './user.json';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
    role: 'user'
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Effect to clear error message when formData changes
    setErrorMessage('');
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.username || !formData.password || !formData.email || !formData.phoneNumber) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (formData.phoneNumber.length !== 10) {
      setErrorMessage('Phone number must be 10 digits long');
      return;
    }

    if (!formData.email.includes('@')) {
      setErrorMessage('Invalid email address');
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }

    // Append new user data to the existing array or initialize with an empty array if userData is not defined
    const newUser = { ...formData };
    const updatedUserData = Array.isArray(userData) ? [...userData, newUser] : [newUser];

    // Write the updated user data back to the JSON file
    // Note: In a real-world scenario, consider using a backend server to handle data storage and retrieval
    // Writing to JSON file directly in client-side code can have security implications
    const json = JSON.stringify(updatedUserData);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Triggering download of the file
    const link = document.createElement('a');
    link.href = url;
    link.download = 'user.json';
    link.click();

    // Clear form data
    setFormData({
      username: '',
      password: '',
      email: '',
      phoneNumber: '',
      role: 'user'
    });

    // Optional: Redirect to another page or show a success message
    // For now, just log a success message
    console.log('Registration successful!');
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <label>Phone Number:</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <br />
        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <br />
        <button type="submit">Register</button>
        <br/>
        <Link to="/login"> {/* Add Link to navigate to login page */}
          <button type="button">Login</button> {/* Login button */}
        </Link>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
