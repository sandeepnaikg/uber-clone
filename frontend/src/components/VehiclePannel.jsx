import React from "react";

const VehiclePannel = (props) => {
  return (
    <div>
      <h5
        className="p-3 text-center absolute w-[93%] top-0  "
        onClick={() => {
          props.setVehiclePannel(false);
        }}
      >
        {" "}
        <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
      </h5>
      <h3 className="text-lg font-semibold mb-2">Choose a Vehicle</h3>

      <div
        className="flex mb-2 border-2 active:border-black border-gray-100 rounded-xl items-center justify-between p-3"
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.createRide('car')
          props.selectVehicle('car');
        }}
      >
        <img
          className="h-14 ml-2  "
          src="https://swyft.pl/wp-content/uploads/2023/05/can-1-person-use-uberx.jpg"
          alt="Car"
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-lg">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill"></i>
            </span>
            4
          </h4>
          <h5 className="text-sm font-medium">2 mins away</h5>
          <p className="text-xs text-gray-600 font-normal">
            Affordable,compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">&#8377;{props.fare.car}</h2>
      </div>

      <div
        className="flex mb-2 border-2  active:border-black border-gray-100 rounded-xl items-center justify-between p-3"
        onClick={() => {
         
          props.setConfirmRidePanel(true);
          props.createRide('bike'); 
          props.selectVehicle('bike');
        }}
      >
        <img
          className="h-14 ml-2 "
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png"
          alt="Car"
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-lg">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill"></i>
            </span>
            1
          </h4>
          <h5 className="text-sm font-medium">4 mins away</h5>
          <p className="text-xs text-gray-600 font-normal">
            Affordable,Motorcycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">&#8377;{props.fare.bike}</h2>
      </div>

      <div
        className="flex mb-2 border-2 active:border-black border-gray-100 rounded-xl items-center justify-between p-3"
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.createRide('auto');
          props.selectVehicle('auto');
        }}
      >
        <img
          className="h-14 ml-2 "
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt="Car"
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-lg">
            Auto{" "}
            <span>
              <i className="ri-user-3-fill"></i>
            </span>
            3
          </h4>
          <h5 className="text-sm font-medium">5 mins away</h5>
          <p className="text-xs text-gray-600 font-normal">
            Affordable,Auto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">&#8377;{props.fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePannel;
