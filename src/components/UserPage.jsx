import React from "react";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("loggedInUser");

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      <h2>Welcome, {user}!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserPage;
