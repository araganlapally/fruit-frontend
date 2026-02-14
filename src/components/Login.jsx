import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await API.post("/login", {
        username: username.trim(),
        password: password.trim()
      });

      const userRes = await API.get(`/user/${username.trim()}`);
      localStorage.setItem("user", JSON.stringify(userRes.data));

      navigate("/fruits");

    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <AuthLayout>

      <div className="card shadow p-4" style={{ width: "380px" }}>
        <h4 className="mb-4 text-center">Sign In</h4>

        <form onSubmit={handleLogin}>

          <div className="mb-3">
            <label className="form-label fw-bold">Username</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-warning w-100 fw-bold">
            Sign In
          </button>

        </form>

        <hr />

        <p className="text-center">
          New to FruitStore?
        </p>

        <Link to="/register" className="btn btn-outline-secondary w-100">
          Create your account
        </Link>

      </div>

    </AuthLayout>
  );
}

export default Login;
