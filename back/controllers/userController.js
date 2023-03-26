const mongoose = require("mongoose");
const User = require("../models/User");

const getUsers = async (req, res, next) => {
  try {
    res.send("all users");
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    res.send(`user id: ${req.params.id}`);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    res.send(`new user: ${req.body}`);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    res.send(`update user: ${req.body}`);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    res.send(`delete user: ${req.params.id}`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
