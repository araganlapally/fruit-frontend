import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ cartCount, onSearch }) {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [search, setSearch] = useState("");

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(search);
    }
  };

  return (
    <nav
      className="d-flex align-items-center px-4"
      style={{ backgroundColor: "#131921", height: "70px" }}
    >

      {/* Logo */}
      <div
        className="text-warning fw-bold fs-4 me-4"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/fruits")}
      >
        🛒 FruitStore
      </div>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="d-flex flex-grow-1"
      >
        <input
          className="form-control"
          type="search"
          placeholder="Search fruits..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-warning ms-2">
          Search
        </button>
      </form>

      {/* Right Section */}
      <div className="d-flex align-items-center text-white ms-4">

        <div className="me-4">
          <small>Hello,</small>
          <div>{user?.username}</div>
        </div>

        <div
          className="me-4 position-relative"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/cart")}
        >
          🛒
          <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
            {cartCount}
          </span>
        </div>

        <button className="btn btn-danger btn-sm" onClick={logout}>
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;
