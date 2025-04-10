const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const rideController = require("../controller/rideController");
const authMiddleware = require("../middlewares/authMiddleware");
router.post(
  "/create",
  authMiddleware.authUser,

  body("pickup").isString().isLength({ min: 3 }).withMessage("invalid pickup"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("  invalid destination "),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "bike"])
    .withMessage("invalid vehicle type"),
  rideController.createRide
);
router.get(
  "/getFare",
  authMiddleware.authUser,
  query("pickup").isString().isLength({ min: 3 }).withMessage("invalid pickup"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("  invalid destination "),
  rideController.getFare
);

router.post(
  "/confirm",
  authMiddleware.authCaptain,
  body("rideId").isMongoId().withMessage("invalid rideId"),
  rideController.confirmRide
);
router.get(
  "/start-ride",
  authMiddleware.authCaptain,
  query("rideId").isMongoId().withMessage("invalid ride id"),
  query("otp").isString().isLength({ max: 6, min: 6 }),
  rideController.startRide
);

router.post(
  "/end-ride",
  authMiddleware.authCaptain,
  body().isMongoId().withMessage("invalid ride id"),
  rideController.endRide
);

module.exports = router;
