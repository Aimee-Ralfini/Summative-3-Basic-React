const express = require("express");

// import the controller functions
const { loginUser, registerUser } = require("../controllers/UserController");

const router = express.Router();

// create user
router.post("/register", registerUser);

// login
router.post("/login", loginUser);

// get users

// get user

// edit user

// delete user

// etc etc

module.exports = router;
