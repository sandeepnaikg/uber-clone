import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import { useNavigate } from "react-router-dom";
import LocationSearchPannel from "../components/LocationSearchPannel";
import VehiclePannel from "../components/VehiclePannel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitForDriver from "../components/WaitForDriver";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePannel, setVehiclePannel] = useState(false);
  const vehiclePannelRef = useRef(null);
  const confirmRidePannelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setfare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const[ride,setRide]=useState(null);
  const navigate=useNavigate()
  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user });
  }, [user, socket]);
socket.on('ride-confirmed', (ride) => {
  setWaitingForDriver(true);
  setVehicleFound(false);
  setRide(ride);
});
socket.on('ride-started',(ride)=>{
  setWaitingForDriver(false)
  navigate('/riding')

})






  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);
    if (value.length < 2) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch (err) {
      console.error("Pickup suggestions error:", err);
    }
  };

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);
    if (value.length < 2) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch (err) {
      console.error("Destination suggestions error:", err);
    }
  };

  const suggestions =
    activeField === "pickup" ? pickupSuggestions : destinationSuggestions;

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleConfirmLocations = () => {
    if (pickup && destination) {
      setPanelOpen(false);
      setTimeout(() => {
        setVehiclePannel(true);
        findTrip(); // call API to get fare
      }, 300);
    }
  };

  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? "70%" : "0%",
      padding: panelOpen ? 24 : 0,
    });
    gsap.to(panelCloseRef.current, {
      opacity: panelOpen ? 1 : 0,
    });
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(vehiclePannelRef.current, {
      transform: vehiclePannel ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [vehiclePannel]);

  useGSAP(() => {
    gsap.to(confirmRidePannelRef.current, {
      transform: confirmRidePanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [confirmRidePanel]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      transform: waitingForDriver ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [waitingForDriver]);

  async function findTrip() {
    setVehiclePannel(true);
    setPanelOpen(false);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/getFare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );
      console.log(response.data);
      setfare(response.data);
    } catch (err) {
      console.error("Error fetching fare:", err);
    }
  }
  async function createRide(vehicleType) {
    console.log("Creating ride with:", {
      pickup,
      destination,
      vehicleType,
      token: localStorage.getItem("token"),
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );
      console.log("Ride created:", response.data);
    } catch (error) {
      console.error(
        "Ride creation failed:",
        error.response?.data || error.message
      );
    }
  }

  return (
    <div className="h-screen relative overflow-hidden">
     <LiveTracking/>
      <div className="h-screen w-screen">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="maps"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col absolute h-screen top-0 w-full justify-end">
        <div className="h-[30%] p-5 bg-white relative">
          <h5
            ref={panelCloseRef}
            className="absolute top-0 text-2xl left-3 opacity-0 cursor-pointer"
            onClick={() => setPanelOpen(false)}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[45%] bg-gray-700 rounded-full left-7"></div>
            <input
              value={pickup}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
                setPickupSuggestions([]);
              }}
              onChange={handlePickupChange}
              type="text"
              placeholder="Add a pickup location"
              className="w-full rounded-lg px-12 py-2 text-lg bg-[#eee] mt-5"
            />
            <input
              value={destination}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
                setDestinationSuggestions([]);
              }}
              onChange={handleDestinationChange}
              type="text"
              placeholder="Enter your destination"
              className="w-full py-2 px-12 text-lg rounded-lg bg-[#eee] mt-5"
            />
            {pickup && destination && (
              <button
                type="button"
                onClick={handleConfirmLocations}
                className="bg-black text-white w-full mt-4 py-2 rounded-lg"
              >
                Find Trip
              </button>
            )}
          </form>
        </div>

        <div className="bg-white h-0" ref={panelRef}>
          <LocationSearchPannel
            setVehiclePannel={setVehiclePannel}
            setPanelOpen={setPanelOpen}
            pickupSuggestions={pickupSuggestions}
            destinationSuggestions={destinationSuggestions}
            activeField={activeField}
            setPickup={setPickup}
            setDestination={setDestination}
            pickup={pickup}
            suggestions={suggestions}
            destination={destination}
            setPickupSuggestions={setPickupSuggestions}
            setDestinationSuggestions={setDestinationSuggestions}
            setActiveField={setActiveField}
          />
        </div>
      </div>

      <div
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-8 translate-y-full"
        ref={vehiclePannelRef}
      >
        <VehiclePannel
          setVehiclePannel={setVehiclePannel}
          setConfirmRidePanel={setConfirmRidePanel} //undhi
          fare={fare} //undhi
          selectVehicle={setVehicleType}
          createRide={createRide} //undhi
        />
      </div>

      <div
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-8 translate-y-full"
        ref={confirmRidePannelRef}
      >
        <ConfirmedRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          createRide={createRide}
          pickup={pickup}
          
          vehicleType={vehicleType}
          destination={destination}
          fare={fare}
        />
      </div>

      <div
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-8 translate-y-full"
        ref={vehicleFoundRef}
      >
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          createRide={createRide}
          pickup={pickup}
          vehicleType={vehicleType}
          destination={destination}
          fare={fare}
        />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-8"
      >
        <WaitForDriver
          waitingForDriver={waitingForDriver}
          setWaitingForDriver={setWaitingForDriver}
          setVehicleFound={setVehicleFound}
          ride={ride}
        />
      </div>
    </div>
  );
};

export default Home;
