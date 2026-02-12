import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';

const Fruits = () => {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8080/fruits/')
      .then((response) => {
        setFruits(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching fruits', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Fruits List</h1>
      <Row>
        {fruits.map((fruit) => (
          <Col key={fruit.id} md={4} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={fruit.imageurl}
                alt={fruit.name}
                style={{
                  height: '200px',
                  objectFit: 'cover',
                  borderTopLeftRadius: '0.25rem',
                  borderTopRightRadius: '0.25rem',
                }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{fruit.name}</Card.Title>
                <Card.Text>{fruit.description}</Card.Text>
                <p className="text-muted">₹{fruit.price}</p>
                <div className="mt-auto">
                  <Button variant="primary" className="w-100">
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

export default Fruits;
