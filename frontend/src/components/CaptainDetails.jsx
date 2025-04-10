// import { useContext } from "react";
// import React from "react";    
// import { CaptainDataContext } from "../context/CaptainContext";


// const CaptainDetails = () => {


//   const { captain } = useContext(CaptainDataContext);
//   return (
//     <>
//       <div className="flex items-center justify-between">
//         <div className="flex items-center justify-start gap-3">
//           <img
//             src="https://img.freepik.com/free-photo/man-having-video-call-with-his-family_23-2149120895.jpg"
//             className="h-10 w-10 rounded-full object-cover"
//             alt=""
//           />
//           <h4 className="text-lg font-medium">{captain.fullname.firstname +""+captain.fullname.lastname}</h4>
//         </div>
//         <div>
//           <h4 className="text-xl font-semibold">&#8377;512.3</h4>
//           <p className="text-sm text-gray-600">Earned</p>
//         </div>
//       </div>
//       <div className="flex justify-center gap-5 p-3 bg-gray-100 rounded-xl items-start mt-6">
//         <div className="text-center">
//           <i className=" text-3xl mb-2 font-thin ri-timer-2-line"></i>
//           <h5 className="text-lg font-medium ">10.2</h5>
//           <p className="text-sm text-gray-600">Hours Online</p>
//         </div>
//         <div className="text-center">
//           <i className=" text-3xl mb-2 font-thin ri-speed-up-line"></i>
//           <h5 className="text-lg font-medium ">23</h5>
//           <p className="text-sm text-gray-600">Trips Completed</p>
//         </div>
//         <div className="text-center">
//           <i className=" text-3xl mb-2 font-thin ri-booklet-line"></i>
//           <h5 className="text-lg font-medium ">4.5</h5>
//           <p className="text-sm text-gray-600">Rating</p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CaptainDetails;
import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            src="https://img.freepik.com/free-photo/man-having-video-call-with-his-family_23-2149120895.jpg"
            className="h-10 w-10 rounded-full object-cover"
            alt="Captain"
          />
          <h4 className="text-lg font-medium capitalize">
            {captain?.fullname?.firstname + " " + captain?.fullname?.lastname}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">&#8377;512.3</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>

      <div className="flex justify-center gap-5 p-3 bg-gray-100 rounded-xl items-start mt-6">
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">23</h5>
          <p className="text-sm text-gray-600">Trips Completed</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
          <h5 className="text-lg font-medium">4.5</h5>
          <p className="text-sm text-gray-600">Rating</p>
        </div>
      </div>
    </>
  );
};

export default CaptainDetails;
