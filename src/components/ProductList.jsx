import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ addToCart }) => {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://18.60.39.246:8080/fruits/') // <-- EC2 backend URL
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

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Available Fruits</h1>
      <div className="row">
        {fruits.map((fruit) => (
          <div key={fruit.id} className="col-md-4 mb-4">
            <div className="card h-100">
              {fruit.imageurl && (
                <img
                  src={fruit.imageurl}
                  alt={fruit.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{fruit.name}</h5>
                <p className="card-text">{fruit.description}</p>
                <p className="text-muted">Price: ₹{fruit.price}</p>
              </div>
              <div className="card-footer text-center">
                <button
                  onClick={() => addToCart(fruit)}
                  className="btn btn-primary w-100"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;