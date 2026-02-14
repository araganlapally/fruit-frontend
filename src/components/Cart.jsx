import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "./Navbar";

function Cart() {

  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await API.get(`/cart/${user.id}`);
    setCart(res.data);
  };

  const increaseQty = async (item) => {
    await API.put(`/cart/${item.id}/${item.quantity + 1}`);
    fetchCart();
  };

  const decreaseQty = async (item) => {
    if (item.quantity > 1) {
      await API.put(`/cart/${item.id}/${item.quantity - 1}`);
    } else {
      await API.delete(`/cart/${item.id}`);
    }
    fetchCart();
  };

  const checkout = async () => {
    const res = await API.post(`/checkout/${user.id}`);
    alert(res.data);
    fetchCart();
  };

  const total = cart.reduce(
    (sum, item) => sum + item.fruit.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar cartCount={cart.length} />

      <div className="container mt-4">

        <h4>Your Shopping Cart</h4>
        <hr />

        {cart.map(item => (
          <div key={item.id} className="card mb-3 p-3 shadow-sm">

            <div className="d-flex justify-content-between align-items-center">

              <div>
                <h6>{item.fruit.name}</h6>
                <p>₹{item.fruit.price}</p>
              </div>

              <div className="d-flex align-items-center">

                <button
                  className="btn btn-outline-secondary btn-sm me-2"
                  onClick={() => decreaseQty(item)}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  className="btn btn-outline-secondary btn-sm ms-2"
                  onClick={() => increaseQty(item)}
                >
                  +
                </button>

              </div>

              <div>
                <strong>
                  ₹{item.fruit.price * item.quantity}
                </strong>
              </div>

            </div>

          </div>
        ))}

        <div className="card p-4 shadow-sm">
          <h5>Subtotal: ₹{total}</h5>

          <button
            className="btn btn-warning mt-3"
            onClick={checkout}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </>
  );
}

export default Cart;
