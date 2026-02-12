import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Card, Alert } from 'react-bootstrap';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const API_BASE = 'http://18.60.39.246:8080'; // <-- EC2 backend

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${API_BASE}/login`, { username, password })
      .then((res) => {
        if (res.status === 200) {
          alert('Login successful!');
          onLogin();
          navigate('/');
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setErrorMessage('Invalid credentials!');
        } else {
          setErrorMessage('Login failed!');
        }
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post(`${API_BASE}/register`, { username, email, password })
      .then(() => {
        alert('Registration successful!');
        setIsLogin(true);
      })
      .catch(() => setErrorMessage('Registration failed!'));
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="w-50">
        <Card.Body>
          <h2 className="text-center mb-4">{isLogin ? 'Login' : 'Register'}</h2>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={isLogin ? handleLogin : handleRegister}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setErrorMessage(''); }}
                required
              />
            </Form.Group>
            {!isLogin && (
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
            )}
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrorMessage(''); }}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </Form>
          <div className="text-center mt-3">
            <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Auth;