import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import { useEffect, useContext } from "react";
import axios from "axios";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);
  const [ride, setRide] = useState(null);
  useEffect(() => {
    socket.emit("join", {
      captainId: captain._id,
      userType: "captain",
    });
    const locationInterval = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          socket.emit("update-location-captain", {
            captainId: captain._id,
            location: { latitude, longitude },
          });
        });
      }
    }, 10000);

    return () => clearInterval(locationInterval);
  });

  socket.on("ride-request", (data) => {
    console.log("ride-request", data);
    setRide(data);
    setRidePopupPanel(true);
  });
  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
          duration: 0.5,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0)",
          duration: 0.5,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    },
    [confirmRidePopupPanel]
  );
  async function confirmRide() {
    const response = await axios.post(
      console.log("response", response.data),
      `${import.meta.env.VITE_BACKEND_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,

        header: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setConfirmRidePopupPanel(true);
    setRidePopupPanel(false);
  }

  return (
    <div className="h-screen">
      <div className="fixed  p-3 top-0 flex items-center justify-between w-full">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          className="w-16 ml-8"
        />
        <Link
          to="/home"
          className=" h-10  w-10  bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-1/2">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="maps"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="h-1/2 p-6">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0  bg-white px-3 py-10 pt-12 translate-y-full"
      >
        <RidePopUp
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          ride={ride}
        />
      </div>

      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full z-10 bottom-0  bg-white px-3 py-10 pt-12  h-screen translate-y-full"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
