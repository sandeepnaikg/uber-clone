import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Riding = (props) => {
  const location = useLocation();
  const rideData = location.state?.ride || {};

  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("ride-ended", () => {
      navigate("/home");
    });

    return () => {
      socket.off("ride-ended");
    };
  }, [socket, navigate]);

  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed h-10  w-10 right-2 top-2 bg-white flex items-center justify-center rounded-full"
      >
        <i className="ri-home-5-line text-lg font-medium"></i>
      </Link>

      <div className="h-1/2">
        <LiveTracking />
        className="h-full w-full object-cover"
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-20 rounded-md"
            src="https://swyft.pl/wp-content/uploads/2023/05/can-1-person-use-uberx.jpg"
            alt="Car"
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">
              {props.ride?.captain.fullname.firstname}
            </h2>
            <h4 className="text-lg font-semibold -mt-1 -mb-1">
              {props.ride?.vehicle.plate}
            </h4>
            <p className="text-xm text-gray-600">swift desire</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <div className="w-full flex flex-col gap-3 ">
            <div className="flex items-start gap-2 p-3  "></div>

            <div className="flex items-start gap-2 p-3 -mb-1 border-b-2 -mt-5">
              <i className="ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-md font-medium">
                  {rideData.destinationName || "RGIA Airport"}
                </h3>
                <p className="text-sm text-gray-600">
                  {rideData.destinationAddress || "Shamshabad, Hyderabad"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 mb-1  ">
              <i className="ri-currency-line "></i>
              <div>
                <h3 className="text-md font-medium">
                  &#8377; {rideData.fare || 193.87}
                </h3>
                <p className="text-sm text-gray-600">
                  {rideData.paymentMethod || "Cash Only"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg ">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
