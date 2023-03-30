const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // create a new schema
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
});

/* This is a static method, which means it is a method that is called on the model itself, like User.find() or User.create(). 
We use static methods to create custom methods that we can use just like the built-in methods.
We will use this method to register a new user by calling User.register() and passing in the user data from the request body in the controller */

// create a new static method called register
userSchema.statics.register = async function (userData) {
  // search for a user with the same email address as the one being registered
  const existingEmail = await this.findOne({ email: userData.email });
  // if a user with the same email address is found, throw an error
  if (existingEmail) {
    throw new Error("An account with this email address already exists");
  }
  // if no user with the same email address is found, create a new user
  const newUser = await this.create(userData);
  // return user so that it can be sent back from the controller
  return newUser;
};

// create a new static method called login
userSchema.statics.login = async function (userData) {
  // search for a user with the same email address as the one being logged in
  const matchingUser = await this.findOne({ email: userData.email });
  // if no user with the same email address is found, throw an error
  if (!matchingUser) {
    throw new Error("no such user registered");
  }
  // if a user with the same email address is found, check if the password matches
  if (userData.password !== matchingUser.password) {
    // if the password doesn't match, throw an error
    throw new Error("incorrect password");
  }
  // if the password matches, return the user so that it can be sent back from the controller
  return matchingUser;
};

//
module.exports = mongoose.model("User", userSchema);
