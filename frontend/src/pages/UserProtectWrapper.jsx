import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const { setUser } = React.useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        setUser(data.captain);
        setIsLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      localStorage.removeItem("token");
      navigate("/login");
    });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
