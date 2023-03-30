const Post = require("../models/Post");
const User = require("../models/User");

const getPosts = async (req, res) => {
  try {
    // The populate method will replace the author field with the user's data from the database, so we can access the user's emails and usernames
    const posts = await Post.find({}).populate("author"); // populate the author field with the user's data from the database
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

const getPost = async (req, res) => {
  try {
    // The populate method will replace the author field with the user's data from the database, so we can access the user's email and username
    // This only works if the author field is a reference to the user's ID in the database (see the post model)
    const post = await Post.findById(req.params.postId).populate("author"); // populate the author field with the user's data from the database
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = {
      ...req.body,
      // Assign the author field to the user's ID from the URL params (from the route)
      // This will allow us to populate the author field with the user's data from the database (see the getPost controller)
      author: req.params.userId,
    };
    const post = await Post.create(newPost);
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

const editPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    post.title = req.body.title;
    post.content = req.body.content;
    post.save();
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    res.json(deletedPost);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

module.exports = { getPosts, getPost, createPost, editPost, deletePost };
