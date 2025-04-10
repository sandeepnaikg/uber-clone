import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          params: {
            rideId: props.ride._id,
            otp: otp,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.status === 200) {
        props.setConfirmRidePopupPanel(false);
        props.setRidePopupPanel(false);
        navigate('/captain-riding');
      }
    } catch (error) {
      console.error('Error starting ride:', error);
    }
  };
  
  return (
    <div>
      <h5
        className="absolute w-full top-2 text-center cursor-pointer"
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-500"></i>
      </h5>

      <h3 className="text-lg font-semibold mb-4  ">
        {" "}
        Confirm this ride to start
      </h3>
      <div className=" p-3 bg-yellow-400 rounded-xl flex items-center justify-between ">
        <div className="flex items-center gap-3">
          <img
            src="https://t4.ftcdn.net/jpg/06/44/52/39/360_F_644523914_z0sLywPEPlVgdqINurVtp6H2RcOHWpnS.jpg "
            alt="driver"
            className="h-12 w-12 rounded-full object-cover"
          />
          <h2 className="text-xl font-medium">
            {props.ride?.user.fullname.firstname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <div className="w-full flex flex-col gap-3 ">
          <div className="flex items-start gap-2 p-3 border-b-2 ">
            <i className="ri-map-pin-2-fill text-xl "></i>
            <div>
              <h3 className="text-md font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600">{props.ride?.pickup}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-md font-medium">RGIA Airport</h3>
              <p className="text-sm text-gray-600">{props.ride?.destination}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 ">
            <i className="ri-currency-line "></i>
            <div>
              <h3 className="text-md font-medium">
                &#8377; {props.ride?.fare}{" "}
              </h3>
              <p className="text-sm text-gray-600">Cash Only</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <form onSubmit={submitHandler}>
            <input
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              value={otp}
              type="text"
              placeholder="Enter OTP"
              className="w-full rounded-lg  px-6 py-4 font-mono text-lg  bg-[#eee] mb-5"
            />
            <button
              className="w-full bg-green-600 text-white font-semibold p-3 rounded-lg  flex justify-center mb-5 text-lg"
              onClick={() => {}}
            >
              Accept Ride
            </button>
            <button
              className="w-full bg-red-600 text-white font-semibold p-3 rounded-lg text-lg    "
              onClick={() => {
                props.setConfirmRidePopupPanel(false);
                props.setRidePopupPanel(false);
              }}
            >
              Cancel Ride
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
