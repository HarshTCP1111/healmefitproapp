<<<<<<< HEAD
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/v1/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        // Assuming you receive user data and tokens from the response
        const { user, tokens } = response.data;

        // Save user and tokens to local storage or context for authentication
        // For example, you can create an AuthContext to store user information
        // and redirect to Profile page after successful login

        // Redirect to Profile page
        window.location.href = '/profile';
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="input-box">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <div className="input-box">
            <input type="submit" value="Log in" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
=======
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Assuming you have styles for login page
import facebookicon from '../assets/facebook.png';
import emailicon from '../assets/email.png';
import healmefitlogo from '../assets/HMFjpg.jpg';
import checkmarkicon from '../assets/Frame 97.png'; // Assuming you have the checkmark icon

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Clear any previous error messages

    try {
      const response = await axios.post('http://44.211.250.6/v1/auth/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const { user, tokens } = response.data;
        if (user.role === 'manager' || user.role === 'driver' || user.role === 'admin') {
          message.success("Successfully Logged In");
          login(user, tokens.access.token);
          navigate('/home');
        } else {
          message.error('Not Exist');
        }
      } else {
        message.error('Not Exist');
      }
    } catch (error) {
      console.error('Error during login:', error);
      message.error('Error during login');
    }
  };

  return (
    <div className="login-container">
      <div className="login-info">
        <div className="circle">
          <div> <a href="#"><img src={checkmarkicon} alt="Facebook" /></a></div>
        </div>
        <h3>We aim to improve the safety and compliance issues in trucking companies and the well-being of truckers.</h3>
      </div>
      <div className="login-box">
        <div className="login-logo">
          <img src={healmefitlogo} alt="Heal Me Fit Logo" />
        </div>
        <h2>Log in</h2>
        <p>Welcome back!</p><br></br>
        <form onSubmit={handleSubmit}>
          <button className="google-login">Log in with Google</button>
          <div className="divider">or</div>
          <div className="input-box">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="input-box">
            <input type="submit" value="Log in" />
          </div>
        </form>
        <div className="login-footer">
          <a href="/forgot-password">Forgot password?</a>
        </div>
        <footer>
          <p>&copy; 2024 Heal Me Fit</p>
          <p>123 Street, San Jose, CA 12345 USA</p><br></br>
          <div className="social-links">
            <a href="#"><img src={facebookicon} alt="Facebook" /></a>
            <a href="#"><img src={emailicon} alt="Email" /></a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;
>>>>>>> Harsh-test
