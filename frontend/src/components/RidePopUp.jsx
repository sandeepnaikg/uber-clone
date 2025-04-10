import React from "react";

const RidePopUp = (props) => {
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

      <h3 className="text-lg font-semibold mb-4  "> New Ride Available!</h3>
      <div className=" p-3 bg-yellow-400 rounded-xl flex items-center justify-between ">
        <div className="flex items-center gap-3">
          <img
            src="https://t4.ftcdn.net/jpg/06/44/52/39/360_F_644523914_z0sLywPEPlVgdqINurVtp6H2RcOHWpnS.jpg "
            alt="driver"
            className="h-12 w-12 rounded-full object-cover"
          />
          <h2 className="text-xl font-medium">{props.ride?.user.fullname.firstname +" "+props.ride?.user.fullname.lastname}</h2>
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
              <h3 className="text-md font-medium">&#8377; {props.ride?.fare} </h3>
              <p className="text-sm text-gray-600">Cash Only</p>
            </div>
          </div>
        </div>

        <div className="flex  mt-5 items-center justify-between w-full">
          <button
            className=" bg-gray-200 text-gray-700 font-semibold p-3 rounded-lg  px-10 "
            onClick={() => {
              props.setRidePopupPanel(false);
            }}
          >
            Ignore
          </button>
          <button
            className=" bg-green-600 text-white font-semibold p-3 rounded-lg px-10  "
            onClick={() => {
              props.setConfirmRidePopupPanel(true);
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
