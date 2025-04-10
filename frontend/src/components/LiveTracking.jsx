import React, { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "490px",
};

const LiveTracking = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId;

    if (navigator.geolocation) {
      const fetchLocation = () => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setPosition({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
            setError(null);
          },
          (err) => {
            console.error("Geolocation error:", err);
            setError(err.message || "Unable to fetch location");
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      };

      // Fetch once immediately
      fetchLocation();

      // Then set interval
      intervalId = setInterval(fetchLocation, 10000); // 10 seconds
    } else {
      setError("Geolocation is not supported by your browser.");
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        {position ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={position}
            zoom={15}
          >
            <Marker position={position} />
          </GoogleMap>
        ) : (
          <div className="text-center mt-10 text-xl text-gray-700">
            {error ? (
              <p className="text-red-600">📍 {error}</p>
            ) : (
              "Fetching location..."
            )}
          </div>
        )}
      </LoadScript>
    </div>
  );
};

export default LiveTracking;
