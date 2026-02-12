// src/components/Cart.js
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.imageurl}
                      alt={item.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <Button
                      variant="outline-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="mx-1"
                    >
                      +
                    </Button>
                    {item.quantity}
                    <Button
                      variant="outline-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="mx-1"
                    >
                      -
                    </Button>
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h2>Total: ₹{calculateTotal()}</h2>
          <Link to="/checkout">
            <Button variant="success">Proceed to Checkout</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
