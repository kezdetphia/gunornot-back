const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const { verifyToken } = require("../middleware/verifyToken");

// Register a new user
router.post("/signup", UserController.signUp);

// router.get("/", UserController.getUser);

router.get("/me", verifyToken, UserController.getMyUser);

// Sign in a user
router.post("/signin", UserController.signIn);

// router.get("/:id", UserController.getUser);

// router.get("/getuserwithguns/:id", UserController.getUserWithGuns);

module.exports = router;
