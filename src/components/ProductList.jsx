import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';

const ProductList = ({ addToCart }) => {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_BASE = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API_BASE}/fruits/`)
      .then((res) => {
        setFruits(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load fruits');
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Spinner animation="border" />
    </Container>
  );

  if (error) return <p>{error}</p>;

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Available Fruits</h1>
      <Row>
        {fruits.map((fruit) => (
          <Col key={fruit.id} md={4} className="mb-4">
            <Card className="h-100">
              {fruit.imageurl && (
                <Card.Img
                  variant="top"
                  src={fruit.imageurl}
                  alt={fruit.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <Card.Body className="d-flex flex-column">
                <Card.Title>{fruit.name}</Card.Title>
                <Card.Text>{fruit.description}</Card.Text>
                <p className="text-muted">₹{fruit.price}</p>
                <div className="mt-auto">
                  <Button variant="primary" className="w-100" onClick={() => addToCart(fruit)}>
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;