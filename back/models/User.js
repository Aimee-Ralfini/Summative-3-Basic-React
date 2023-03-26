const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
});

// static methods
userSchema.statics.register = async function (userData) {
  // check if existing
  const existingEmail = await this.findOne({ email: userData.email });
  if (existingEmail) {
    // if existing, generate an error and exit
    throw new Error("An account with this email address already exists");
  }

  // otherwise continue with creation
  const newUser = await this.create(userData);
  // return user so that it can be sent back from the controller
  return newUser;
};

userSchema.statics.login = async function (userData) {
  const matchingUser = await this.findOne({ email: userData.email });
  if (!matchingUser) {
    throw new Error("no such user registered");
  }
  if (userData.password !== matchingUser.password) {
    throw new Error("incorrect password");
  }
  return matchingUser;
};

module.exports = mongoose.model("User", userSchema);
