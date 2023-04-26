import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const HrRoute = ({ children }) => {
  const navigate = useNavigate();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const res = await axios.get("http://localhost:8080/api/v1/auth/hr-auth", {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("authToken"))?.token,
        },
      });
      if (res.data.success) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    checkAuth();
  }, []);

  return ok ? children : navigate("/login");
};

export default HrRoute;
