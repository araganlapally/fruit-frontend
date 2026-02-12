import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Card, Alert } from 'react-bootstrap';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Hard-coded credentials
  const HARDCODED_USERNAME = 'admin';
  const HARDCODED_PASSWORD = 'admin123';

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === HARDCODED_USERNAME && password === HARDCODED_PASSWORD) {
      alert('Login successful!');
      onLogin();
      navigate('/');
    } else {
      setErrorMessage('Invalid credentials!');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Skip actual registration; just show success
    alert('Registration successful!');
    setIsLogin(true);
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

            { !isLogin && (
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            <Form.Group controlId="formPasswordLogin" className="mb-3">
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