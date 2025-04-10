const axios = require("axios");
const captainModel = require("../models/captainModel");

module.exports.getAddressCoordinate = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address: address,
          key: process.env.GOOGLE_MAPS_API,
        },
      }
    );

    const results = response.data.results;
    if (results.length === 0) {
      throw new Error("No results found");
    }

    return results[0].geometry.location;
  } catch (error) {
    console.error(
      "Google Maps API Error:",
      error.response?.data || error.message
    );
    throw new Error("Unable to fetch coordinates");
  }
};
module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    return res
      .status(400)
      .json({ message: "Origin and destination are required" });
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status !== "OK") {
        throw new Error("no routes found");
      }

      return response.data.rows[0].elements[0];
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports.getAutocompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("Input is required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data.status === "OK") {
      return response.data.predictions;
    } else {
      console.error("Google Places Autocomplete API Error:", response.data);
      throw new Error("Unable to fetch suggestions");
    }
  } catch (err) {
    console.error(
      "Autocomplete Axios Error:",
      err.response?.data || err.message
    );
    throw new Error("Unable to fetch suggestions");
  }
};
module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
  try {
    const captains = await captainModel.find({
      location: {
        $geoWithin: {
          $centerSphere: [[lng, lat], radius / 6371],
        },
      },
    });

    return captains;
  } catch (error) {
    console.error("Error fetching captains:", error);
    throw new Error("Unable to fetch captains");
  }
};
