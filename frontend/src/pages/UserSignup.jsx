import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { useContext } from "react";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    console.log(response);
    if (response.status === 200 || response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setEmail("");
    setFirstName("");
    setLastName("");
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
            <h3 className="text-base font-medium mb-2">What's your name</h3>
            <div className="flex gap-2 mb-6 ">
              <input
                required
                type="text"
                className="bg-[#eeeeee] border  w-1/2 border-gray-300 rounded px-4 py-2  text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 "
                placeholder="First name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />

              <input
                required
                type="text"
                className="bg-[#eeeeee] border w-1/2 border-gray-300 rounded px-4 py-2 text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 "
                placeholder="Last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>

            <h3 className="text-base font-medium mb-2">What's your email</h3>
            <input
              type="email"
              required
              className="bg-[#eeeeee] border border-gray-300 rounded px-4 py-2 w-full text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 mb-6"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <h3 className="text-base  font-medium mb-2">Enter Password</h3>
            <input
              type="password"
              className="bg-[#eeeeee] border border-gray-300 rounded px-4 py-2 w-full text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 mb-6"
              required
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="bg-[#111] text-white font-semibold  rounded px-4 py-2 w-full text-lg   mb-3">
              Create Account
            </button>
            <p className="text-center">
              Already have an account? {""}
              <Link className="text-blue-600" to="/login">
                Login here
              </Link>
            </p>
          </form>
        </div>
        <div>
          <p className="text-[10px] leading-tight">
            By proceeding,you consent to get calls,WhatsApp or SMS messages
            includes by automated means ,from uber and its affilates to the
            number provided
          </p>
        </div>
      </div>
    </>
  );
};

export default UserSignup;
