import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }
  }, [token, navigate]);
  axios
    .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        setIsLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      localStorage.removeItem("token");
      navigate("/captain-login");
    });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};

export default CaptainProtectWrapper;
