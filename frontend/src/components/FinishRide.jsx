// import React from "react";
// import { Link } from "react-router-dom";

// const FinishRide = (probs) => {
//   return (
//     <div>
//       <h5
//         className="absolute w-full top-2 text-center cursor-pointer"
//         onClick={() => {
//           probs.setFinishRidePannel(false);
//         }}
//       >
//         <i className="ri-arrow-down-wide-line text-3xl text-gray-500"></i>
//       </h5>

//       <h3 className="text-lg font-semibold mb-4  "> Finish this ride !</h3>
//       <div className=" p-3 bg-yellow-400 rounded-xl flex items-center justify-between ">
//         <div className="flex items-center gap-3">
//           <img
//             src="https://t4.ftcdn.net/jpg/06/44/52/39/360_F_644523914_z0sLywPEPlVgdqINurVtp6H2RcOHWpnS.jpg "
//             alt="driver"
//             className="h-12 w-12 rounded-full object-cover"
//           />
//           <h2 className="text-xl font-medium">Teena</h2>
//         </div>
//         <h5 className="text-lg font-semibold">2.2 KM</h5>
//       </div>

//       <div className="flex flex-col gap-4 items-center">
//         <div className="w-full flex flex-col gap-3 ">
//           <div className="flex items-start gap-2 p-3 border-b-2 ">
//             <i className="ri-map-pin-2-fill text-xl "></i>
//             <div>
//               <h3 className="text-md font-medium">562/11-A</h3>
//               <p className="text-sm text-gray-600">
//                 Near Kapoor's Cafe, Hyderabad
//               </p>
//             </div>
//           </div>

//           <div className="flex items-start gap-2 p-3 border-b-2">
//             <i className="ri-map-pin-user-fill"></i>
//             <div>
//               <h3 className="text-md font-medium">RGIA Airport</h3>
//               <p className="text-sm text-gray-600">Shamshabad, Hyderabad</p>
//             </div>
//           </div>

//           <div className="flex items-start gap-2 p-3 ">
//             <i className="ri-currency-line "></i>
//             <div>
//               <h3 className="text-md font-medium">&#8377; 193.87 </h3>
//               <p className="text-sm text-gray-600">Cash Only</p>
//             </div>
//           </div>
//         </div>

//         <div className="mt-6 w-full">
//           <Link
//             to="/captain-home"
//             className="w-full bg-green-600 text-white font-semibold p-3 rounded-lg  flex text-lg justify-center mb-5"
//             onClick={() => {}}
//           >
//             Finish Ride
//           </Link>
//           <p className=" mt-10 text-xs text-red-400">Click on finish ride button if you have completed the payment </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FinishRide;
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FinishRide = (props) => {
  const navigate = useNavigate();

  async function endRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        {
          rideId: props.ride_id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
      
        navigate("/captain-home");
      }
    } catch (err) {
      console.error("Error finishing ride:", err);
    }
  }
  return (
    <div>
      <h5
        className="absolute w-full top-2 text-center cursor-pointer"
        onClick={() => {
          props.setFinishRidePannel(false);
        }}
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-500"></i>
      </h5>

      <h3 className="text-lg font-semibold mb-4">Finish this ride!</h3>
      <div className="p-3 bg-yellow-400 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://t4.ftcdn.net/jpg/06/44/52/39/360_F_644523914_z0sLywPEPlVgdqINurVtp6H2RcOHWpnS.jpg"
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
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-start gap-2 p-3 border-b-2">
            <i className="ri-map-pin-2-fill text-xl"></i>
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

          <div className="flex items-start gap-2 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-md font-medium">
                &#8377; {props.ride?.fare}
              </h3>
              <p className="text-sm text-gray-600">Cash Only</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <button
            onClick={endRide}
            className="w-full bg-green-600 text-white font-semibold p-3 rounded-lg flex text-lg justify-center mb-5"
          >
            Finish Ride
          </button>
          <p className="mt-10 text-xs text-red-400">
            Click on finish ride button if you have completed the payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
