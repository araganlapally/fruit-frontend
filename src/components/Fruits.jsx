import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "./Navbar";

function Fruits() {

  const [fruits, setFruits] = useState([]);
  const [filteredFruits, setFilteredFruits] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchFruits();
    fetchCartCount();
  }, []);

  const fetchFruits = async () => {
    const res = await API.get("/fruits/");
    setFruits(res.data);
    setFilteredFruits(res.data);
  };

  const fetchCartCount = async () => {
    const res = await API.get(`/cart/${user.id}`);
    setCartCount(res.data.length);
  };

  const addToCart = async (fruitId) => {
    await API.post(`/cart/${user.id}/${fruitId}`);
    fetchCartCount();
  };

  const handleSearch = async (query) => {

  if (!query) {
    fetchFruits();
    return;
  }

  const res = await API.get(`/fruits/search?name=${query}`);
  setFilteredFruits(res.data);
};


  return (
    <>
      <Navbar cartCount={cartCount} onSearch={handleSearch} />

      <div className="container mt-4">

        <div className="row">
          {filteredFruits.map(fruit => (
            <div className="col-md-3 mb-4" key={fruit.id}>
              <div className="card h-100 shadow-sm border-0 product-card">

                <img
                  src={fruit.imageurl}
                  alt={fruit.name}
                  className="card-img-top p-3"
                  style={{ height: "200px", objectFit: "contain" }}
                />

                <div className="card-body">
                  <h6>{fruit.name}</h6>
                  <h5 className="text-danger fw-bold">
                    ₹{fruit.price}
                  </h5>

                  <button
                    className="btn btn-warning w-100 mt-2"
                    onClick={() => addToCart(fruit.id)}
                  >
                    Add to Cart
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

export default Fruits;
