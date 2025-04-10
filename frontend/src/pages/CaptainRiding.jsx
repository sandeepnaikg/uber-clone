import React from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import FinishRide from "../components/FinishRide";
import { useState } from "react";
import LiveTracking from "../components/LiveTracking";
const CaptainRiding = () => {
  const location = useLocation();
  const [finishRidePannel, setFinishRidePannel] = useState(false);
  const finishRidePannelRef = useRef(null);

  useGSAP(
    function () {
      if (finishRidePannel) {
        gsap.to(finishRidePannelRef.current, {
          transform: "translateY(0)",
          duration: 0.5,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(finishRidePannelRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    },
    [finishRidePannel]
  );

  return (
    <>
      <div className="h-screen ">
        <div className="fixed  p-3 top-0 flex items-center justify-between w-full">
          <LiveTracking />

          <Link
            to="/home"
            className=" h-10  w-10  bg-white flex items-center justify-center rounded-full"
          >
            <i className="ri-logout-box-r-line"></i>
          </Link>
        </div>

        <div className="h-4/5">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt="maps"
            className="h-full w-full object-cover"
          />
        </div>

        <div
          className="h-1/5 p-6 bg-yellow-400 flex items-center justify-between relative "
          onClick={() => {
            setFinishRidePannel(true);
          }}
        >
          <h5
            className="absolute w-[80%] top-0 text-center cursor-pointer"
            onClick={() => {}}
          >
            <i className="ri-arrow-down-wide-line text-3xl text-gray-500"></i>
          </h5>

          <h4 className="text-xl font-semibold text-black">
            {location.state?.distance || "4 KM away"}
          </h4>
          <button className="bg-green-600 hover:bg-green-700  text-white font-semibold p-2 px-8 rounded-lg">
            Complete Ride
          </button>
        </div>
        <div
          ref={finishRidePannelRef}
          className="fixed w-full z-10 bottom-0  bg-white px-3 py-10 pt-12 translate-y-full"
        >
          <FinishRide setFinishRidePannel={setFinishRidePannel} />
        </div>
      </div>
    </>
  );
};

export default CaptainRiding;
