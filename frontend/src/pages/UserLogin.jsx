import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useContext } from "react";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );
    if (response.status === 200 || response.status === 201) {
      const data = response.data;
      setUser(data.user);

      localStorage.setItem("token", data.token);
      navigate("/home");
    }
    console.log(response);
    console.log(userData);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7  h-screen flex flex-col justify-between">
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          className="w-16  mb-10"
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
            New here?{" "}
            <Link className="text-blue-600" to="/signup">
              Create new Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          className="bg-[#10b461] text-white font-semibold  flex items-center justify-center rounded px-4 py-2 w-full text-lg  mb-5   "
          to="/captain-login"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
