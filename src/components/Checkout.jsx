// src/components/Checkout.js
import React from 'react';
import { Button, Table, Card, Col, Row } from 'react-bootstrap';

const Checkout = ({ cart, clearCart }) => {
  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert('Thank you for your purchase!');
    clearCart();
  };

  return (
    <div className="container my-5">
      <Row>
        <Col md={8}>
          <Card>
            <Card.Header as="h5" className="bg-success text-white">
              <strong>Order Summary</strong>
            </Card.Header>
            <Card.Body>
              {cart.length === 0 ? (
                <p>Your cart is empty!</p>
              ) : (
                <>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <img
                              src={item.imageurl}
                              alt={item.name}
                              style={{
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover',
                              }}
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>₹{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>₹{item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <h4 className="text-right">
                    <strong>Total: ₹{calculateTotal()}</strong>
                  </h4>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header as="h5" className="bg-primary text-white">
              <strong>Checkout</strong>
            </Card.Header>
            <Card.Body>
              <Button variant="success" onClick={handleCheckout} className="w-100">
                Complete Purchase
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
