import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const captain = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/login`,
      captain
    );
    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className="p-7  h-screen flex flex-col justify-between">
        <div>
          <img
            src="https://www.svgrepo.com/show/505031/uber-driver.svg"
            className="w-20  mb-3"
          />
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className="text-xl font-medium mb-2">What's your email</h3>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#eeeeee] border border-gray-300 rounded px-4 py-2 w-full text-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 mb-7"
              placeholder="example@gmail.com"
            />

            <h3 className="text-xl  font-medium mb-2">Enter Password</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#eeeeee] border border-gray-300 rounded px-4 py-2 w-full text-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 mb-7"
              required
              placeholder="password"
            />
            <button className="bg-[#111] text-white font-semibold  rounded px-4 py-2 w-full text-lg   mb-3">
              Login
            </button>
            <p className="text-center">
              Join a fleet?{" "}
              <Link className="text-blue-600" to="/captain-signup">
                Register as a Captain
              </Link>
            </p>
          </form>
        </div>
        <div>
          <Link
            className="bg-[#d5622d] text-white font-semibold  flex items-center justify-center rounded px-4 py-2 w-full text-lg  mb-5   "
            to="/login"
          >
            Sign in as User
          </Link>
        </div>
      </div>
    </>
  );
};

export default CaptainLogin;
