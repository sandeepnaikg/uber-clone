// const userModel = require("../models/userModel");
// const userService = require("../service/userService");
// const { validationResult } = require("express-validator");

// module.exports.registerUser = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   console.log(req.body);
//   const { fullname, lastname, email, password } = req.body;

//   const hashPassword = await userModel.hashPassword(password);

//   const user = await userService.createUser({
//     firstname: fullname.firstname,
//     lastname: fullname.lastname,
//     email,
//     password: hashPassword,
//   });
//   const token = user.generateAuthToken();
//   res.status(201).json({
//     token,
//     user,
//   });
// };
// module.exports.loginUser = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   const { email, password } = req.body;
//   const user = await userModel.findOne({ email }.select("+password"));
//   if (!user) {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }
//   const isMatch = await user.comparePassword(password);
//   if (!isMatch) {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }
//   const token = user.generateAuthToken();
//   res.status(200).json({
//     token,
//     user,
//   });
// };
const userModel = require("../models/userModel");
const userService = require("../service/userService");
const { validationResult } = require("express-validator");
const blacklistToken = require("../models/blacklistToken");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.body);
  const { fullname, email, password } = req.body;
  const isUserAlready = await userModel.findOne({ email });
  if (isUserAlready) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    // Hash Password
    const hashPassword = await userModel.hashPassword(password);

    // Create User
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashPassword,
    });

    // Generate Token
    const token = user.generateAuthToken();

    res.status(201).json({
      token,
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find user and include password
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = user.generateAuthToken();
    // Set token in cookies
    res.cookie("token", token);

    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};
module.exports.logoutUser = async (req, res, next) => {
  // Clear the cookie
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklistToken.create({ token });
  res.status(200).json({ message: "Logout successful" });
};
