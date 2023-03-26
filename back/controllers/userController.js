const mongoose = require("mongoose");
const User = require("../models/User");

const registerUser = async (req, res, next) => {
  res.json({
    message: "register new user",
    data: req.body,
  });
};

const loginUser = async (req, res, next) => {
  res.json({
    message: "login user",
    data: req.body,
  });
};

module.exports = {
  loginUser,
  registerUser,
};
