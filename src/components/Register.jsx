import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

function Register() {

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/register", form);
      alert("Registration successful!");
      navigate("/");
    } catch {
      alert("Registration failed!");
    }
  };

  return (
    <AuthLayout>

      <div className="card shadow p-4" style={{ width: "380px" }}>
        <h4 className="mb-4 text-center">Create Account</h4>

        <form onSubmit={handleRegister}>

          <div className="mb-3">
            <label className="form-label fw-bold">Username</label>
            <input
              className="form-control"
              name="username"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-warning w-100 fw-bold">
            Create Account
          </button>

        </form>

      </div>

    </AuthLayout>
  );
}

export default Register;
