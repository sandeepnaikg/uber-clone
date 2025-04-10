import React from "react";

const WaitForDriver = (props) => {
  return (
    <div className="relative bg-white p-4 rounded-lg pt-8 shadow-lg">
      <h5
        className="absolute w-full top-2 text-center cursor-pointer"
        onClick={() => props.setWaitingForDriver(false)}
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-500"></i>
      </h5>

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
            {props.ride?.captain.vehicle.plate}
          </h4>
          <p className="text-xm text-gray-600">swift desire</p>
          <h1 className="text-lg font-semibold">{props.ride?.otp}</h1>
        </div>
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
                &#8377; {props.ride?.fare}
              </h3>
              <p className="text-sm text-gray-600">Cash Only</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitForDriver;
