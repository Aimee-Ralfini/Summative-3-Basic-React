const mongoose = require("mongoose");
const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const newUser = await User.register(req.body);
    res.json(newUser);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const authenticatedUser = await User.login(req.body);
    res.json(authenticatedUser);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
