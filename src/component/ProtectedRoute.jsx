import { useNavigate } from "react-router-dom";
import { useAuthData } from "../context/AuthContext";
import React, { useEffect } from "react";
import { Button } from "antd";




const ProtectedRoute = ({ element }) => {
  const { isSignedIn } = useAuthData();
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login");
  };


  return isSignedIn && element  
};

export default ProtectedRoute;
