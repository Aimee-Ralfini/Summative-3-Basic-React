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
    const post = await Post.findById(req.params.id);
    res.json(post);
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

const editPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.title = req.body.title;
    post.content = req.body.content;
    post.authorId = req.body.authorId;
    post.save();
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

module.exports = { getPosts, getPost, createPost, editPost, deletePost };
