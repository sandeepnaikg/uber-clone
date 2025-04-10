// const express = require("express");
// const router = express.Router();
// const userController = require("../controller/userController");
// const { body } = require("express-validator");
// const authMiddleware = require("../middlewares/authMiddleware");
// router.post(
//   "/register",
//   [
//     body("email").isEmail().withMessage("invalid email"),
//     body("fullname.firstname")
//       .isLength({ min: 3 })
//       .withMessage("Password must be at least 6 characters long"),
//     body("password").isLength({ min: 6 }).withMessage(""),
//   ],
//   userController.registerUser
// );

// router.post(
//   "/login",
//   [
//     body("email").isEmail().withMessage("invalid email"),
//     body("password").isLength({ min: 6 }).withMessage("password is required"),
//   ],

//   userController.loginUser
// );
// router.get("/profile", authMiddleware.authUser, userController.getUserProfile);
// router.get("/logout", authMiddleware.authUser, userController.logoutUser);

// module.exports = router;






const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.loginUser
);

router.get("/profile", authMiddleware.authUser, userController.getUserProfile);
router.get("/logout", authMiddleware.authUser, userController.logoutUser);

module.exports = router;
