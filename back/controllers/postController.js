const mongoose = require("mongoose");
const Post = require("../models/Post");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    res.json(deletedPost);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

module.exports = { getPosts, createPost, deletePost };
