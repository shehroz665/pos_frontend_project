import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { showErrorAlert,showSuccessAlert } from './Alerts/Alert';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 300px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = 'http://127.0.0.1:8000/api/login'; 
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
     // console.log('responseData', response.data);
      const token = response.data.data.token;
      // console.log('token',token);
      localStorage.setItem('token', token);
      if (response.status === 200) {
        showSuccessAlert('Login successful');
        navigate('/statistics');      
      } else if(response.status === 401) {
        showErrorAlert('Login failed. Please check your credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      showErrorAlert(error.message);
    }
  };

  return (
    <Container>
    <Form onSubmit={handleSubmit}>
      <Title>Sign In</Title>
      <FormGroup>
        <Label>Email:</Label>
        <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label>Password:</Label>
        <Input
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
      </FormGroup>
      <Button type="submit">Login</Button>
    </Form>
  </Container>
  );
}

export default Login;
