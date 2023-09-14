import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin123');
  const [response, setResponse] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define the URL of your Laravel API login endpoint
    const apiUrl = 'http://127.0.0.1:8000/api/login'; // Replace with your API endpoint

    // Prepare the data to send in the POST request
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(apiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('responseData', response.data);

      // Handle the response based on your Laravel API authentication logic
      if (response.status === 200) {
        // Authentication was successful
        // You can store user data or a token in your state or context
        // For simplicity, we'll just show a success message here
        setResponse('Login successful');
      } else if(response.status === 401) {
        // Authentication failed
        setResponse('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>

      {response && <p>{response}</p>}
    </div>
  );
}

export default Login;
