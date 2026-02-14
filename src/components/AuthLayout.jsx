import React from "react";

function AuthLayout({ children }) {
  return (
    <>
      <div
        style={{
          backgroundColor: "#131921",
          padding: "15px",
          textAlign: "center"
        }}
      >
        <h3 className="text-warning fw-bold m-0">
          🛒 FruitStore
        </h3>
      </div>

      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        {children}
      </div>
    </>
  );
}

export default AuthLayout;
