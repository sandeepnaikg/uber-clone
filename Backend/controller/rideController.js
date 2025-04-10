
const rideService = require("../service/rideServices");
const { validationResult } = require("express-validator");
const mapService = require("../service/mapsService");
const rideModel = require("../models/rideModel");
const { sendMessageToSocketId } = require("../socket"); // ✅ fixed import

module.exports.createRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    const captainsInTheRadius = await rideService.getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      2
    );

    console.log("captainsInTheRadius", captainsInTheRadius);
    console.log("pickupCoordinates", pickupCoordinates);

    ride.otp = "";

    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

    captainsInTheRadius.map(async (captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "ride-request",
        data: rideWithUser,
      });
    });

    return res.status(201).json(ride); // ✅ moved response here
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getFare = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;
  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.confirmRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  try {
    const ride = await rideService.confirmRide({
      rideId,
      captain: req.captain,
    });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;

  try {
    const ride = await rideService.startRide(rideId, otp, {
      captain: req.captain,
    });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
      const ride = await rideService.endRide({ rideId, captain: req.captain });

      sendMessageToSocketId(ride.user.socketId, {
          event: 'ride-ended',
          data: ride
      });

      return res.status(200).json(ride);
  } catch (err) {
      return res.status(500).json({ message: err.message });
  }
};