// const userModel = require("../models/userModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const blacklistToken = require("../models/blacklistToken");
// const captainModel = require("../models/captainModel");

// module.exports.authUser = async (req, res, next) => {
//   const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
//   const isBlacklisted = await blacklistToken.findOne({ token: token });
//   if (isBlacklisted) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await userModel.findById(decoded._id);
//     req.user = user;

//     return next();
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// };
// module.exports.authCaptain = async (req, res, next) => {
//   const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
//   const isBlacklisted = await blacklistToken.findOne({ token: token });
//   if (isBlacklisted) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const captain = await captainModel.findById(decoded._id);
//     req.captain = captain;
//     return next();
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// };
const userModel = require("../models/userModel");
const captainModel = require("../models/captainModel");
const blacklistToken = require("../models/blacklistToken");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await blacklistToken.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded._id);
    return next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await blacklistToken.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.captain = await captainModel.findById(decoded._id);
    return next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
