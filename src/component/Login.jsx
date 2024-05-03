// Login.js
import React, { useState } from 'react';
import './Login.css'; // Import CSS file for styling
import userData from './user.json';

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const user = userData.find((user) => user.username === username && user.password === password);
    if (user) {
      setLoggedIn(true); // Set loggedIn to true
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="login-container"> {/* Apply CSS class */}
      <h2 className="login-title">Login</h2> {/* Apply CSS class */}
      <form onSubmit={handleLogin} className="login-form"> {/* Apply CSS class */}
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <button type="submit">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
