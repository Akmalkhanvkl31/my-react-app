import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login'; // Create a Login component
import OtpVerification from './OtpVerification'; // Create an OtpVerification component
import MyAssessments from './MyAssessments'; // Your dashboard component
import axios from 'axios';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Function to handle login
  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password });
      if (response.data.success) {
        setUserEmail(email);
        // Navigate to OTP verification page after successful login
        // You might need to implement your routing logic to handle this
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  // Function to handle OTP verification
  const handleOtpVerification = async (otp) => {
    try {
      const response = await axios.post('/api/verify-otp', { email: userEmail, otp });
      if (response.data.success) {
        setIsAuthenticated(true);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      alert('OTP verification failed. Please try again.');
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/assessments" /> : <Login onLogin={handleLogin} />} />
        <Route path="/otp" element={isAuthenticated ? <Navigate to="/assessments" /> : <OtpVerification onVerifyOtp={handleOtpVerification} />} />
        <Route path="/assessments" element={isAuthenticated ? <MyAssessments /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
