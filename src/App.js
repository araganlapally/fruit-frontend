import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Fruits from "./components/Fruits";
import Cart from "./components/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/fruits" element={<Fruits />} />
        <Route path="/cart" element={<Cart />} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
