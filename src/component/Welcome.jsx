import React, { useState, useEffect } from 'react';
import userData from './user.json';
import postData from './post.json';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import CustomNavbar from './Navbar';
const Welcome = () => {
  const [formData, setFormData] = useState({
    usercontent: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Effect to clear error message when formData changes
    setErrorMessage('');
  }, [formData]);

  const getCurrentUsername = () => {
    // Assuming the first user in the user.json is the current user
    return userData[0].username;
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0'); // Get day of the month with leading zero if needed
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get month with leading zero if needed
    const year = currentDate.getFullYear(); // Get year
    return `${day}/${month}/${year}`; // Combine day, month, and year
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.usercontent ) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Add username and current date to form data
    const username = getCurrentUsername();
    const currentDate = getCurrentDate();
    const newPost = { ...formData, username, currentDate };

    // Append new post data to the existing array or initialize with an empty array if postData is not defined
    const updatedPostData = Array.isArray(postData) ? [...postData, newPost] : [newPost];

    // Write the updated post data back to the JSON file
    const json = JSON.stringify(updatedPostData);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Triggering download of the file
    const link = document.createElement('a');
    link.href = url;
    link.download = 'post.json';
    link.click();

    // Clear form data
    setFormData({
      usercontent: ''
    });

    console.log('successful!');
  };

  return (
    
    <>
    <CustomNavbar/>
    <div className="register-container">
          
      <form onSubmit={handleSubmit} className="register-form">
        <label>Enter your post:</label>
        <input
          type="text"
          name="usercontent"
          value={formData.usercontent}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Create Post</button>
      
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <Link to="/viewmypost"> <button className='n-btn'>View My Post</button></Link>
       
        <button className='n-btn'>View Other user Post</button>
      </div>
      </>
  );
};

export default Welcome;
