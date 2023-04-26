import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const Spinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 3000);
    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate, location]);
  return (
    <div
      class="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
