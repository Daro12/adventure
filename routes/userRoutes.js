const express = require("express");
const multer = require("multer");
const userController = require("../controllers/userController");
const authController = require("./../controllers/authController");

const upload = multer({ dest: "public/img/users" });

const router = express.Router();

// AUTHENTICATION
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// ALL THE ROUTES BELOW WILL GO THROW THE PROJECTED ROUTE
router.use(authController.protect); // middleware

router.patch(
  "/updateMyPassword",

  authController.updatePassword
);

router.get(
  "/me",

  userController.getMe,
  userController.getUser
);

// UPDATE DATA OF AUTHENTICATION USER
router.patch("/updateMe", 
userController.uploadUserPhoto,
userController.resizeUserPhoto,
userController.updateMe);
// DELETE USER ROUTE
router.delete("/deleteMe", userController.deleteMe);

// USER ROUTE (ONLY ADMIN WILL BE ABLE TO PERFORM TASKS BELOW)
router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
