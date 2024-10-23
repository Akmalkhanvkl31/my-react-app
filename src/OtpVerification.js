import React from 'react';
import { useState } from 'react';

function OtpVerification() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/auth/verify-otp-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful OTP verification
      } else {
        setError('OTP verification failed');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  return (
    <div>
      <h2>OTP Verification</h2>
      <form onSubmit={handleOtpVerification}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />
        <button type="submit">Verify OTP</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default OtpVerification;
