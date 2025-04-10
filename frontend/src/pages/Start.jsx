import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <>
      <div>
        <div className="h-screen w-full bg-cover bg-center   bg-[url(https://img.freepik.com/premium-vector/city-crossroad-with-traffic-lights-road-markings-sidewalk-pedestrians_1441-1543.jpg)] flex justify-between flex-col pt-5 ">
        <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            className="w-16 ml-8"
          />
          <div className=" bg-white  px-5 py-5  pb-7 ">
            <h2 className="text-3xl font-bold">Get started with Uber</h2>
            <Link
              className=" w-full bg-black text-white py-3 mt-4 rounded flex justify-center items-center"
              to="/login"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Start;
