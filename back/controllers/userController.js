// Users are pretty straightforward, we just need to create and login users, so we'll only need two controller functions

const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    // register the user with the data from the request body
    const newUser = await User.register(req.body);
    // send the new user back to the client
    res.json(newUser);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    // login the user with the data from the request body
    const authenticatedUser = await User.login(req.body);
    // send the authenticated user back to the client
    res.json(authenticatedUser);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

// export the controller functions
module.exports = {
  loginUser,
  registerUser,
};
