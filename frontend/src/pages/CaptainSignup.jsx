import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captainData
    );
    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };
  return (
    <>
      <div className="p-7  h-screen flex flex-col justify-between">
        <div>
          <img
            src="https://www.svgrepo.com/show/505031/uber-driver.svg"
            className="w-20 "
          />
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className="text-base font-medium mb-2">
              What's our Captain's name
            </h3>
            <div className="flex gap-2 mb-4 ">
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

            <h3 className="text-base font-medium mb-2">
              What's our Captain's email
            </h3>
            <input
              type="email"
              required
              className="bg-[#eeeeee] border border-gray-300 rounded px-4 py-2 w-full text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 mb-4"
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

            <div className=" mb-4">
              <h3 className="text-base font-medium mb-3">
                Vehicle Information
              </h3>

              <div className="flex flex-wrap gap-3">
                <input
                  type="text"
                  placeholder="Vehicle Color"
                  className="bg-[#eeeeee] border w-[48%] border-gray-300 rounded px-4 py-2 text-base placeholder:text-gray-500 focus:outline-none focus:ring-2"
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Vehicle Plate Number"
                  className="bg-[#eeeeee] border w-[48%] border-gray-300 rounded px-4 py-2 text-base placeholder:text-gray-500 focus:outline-none focus:ring-2"
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Vehicle Capacity"
                  className="bg-[#eeeeee] border w-[48%] border-gray-300 rounded px-4 py-2 text-base placeholder:text-gray-500 focus:outline-none focus:ring-2"
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                />

                <select
                  className="bg-[#eeeeee] border w-[48%] border-gray-300 rounded px-4 py-2 text-base text-gray-500 focus:outline-none focus:ring-2"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Vehicle Type
                  </option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="bike">Bike</option>
                </select>
              </div>
            </div>

            <button className="bg-[#111] text-white font-semibold  rounded px-4 py-2 w-full text-lg   mb-3">
              Create Captain Account
            </button>
            <p className="text-center mb-3">
              Already have an account? {""}
              <Link className="text-blue-600" to="/captain-login">
                Login here
              </Link>
            </p>
          </form>
        </div>
        <div>
          <p className="text-[10px] leading-tight ">
            This site is protected by reCAPTCHA and{" "}
            <span className="underline text-blue-500">
              Google Privacy and Policy {""}
            </span>
            and {""}
            <span className="underline text-blue-500">
              Terms of Service apply
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CaptainSignup;
