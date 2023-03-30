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

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = { ...req.body, authorId: req.params.userId };
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
