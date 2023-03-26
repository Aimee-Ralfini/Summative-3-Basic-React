const express = require("express");
const {
  getPosts,
  createPost,
  deletePost,
} = require("../controllers/postController");

const router = express.Router();

// create post
router.post("/", createPost);

// get posts
router.get("/", getPosts);

// get post

// edit post

// delete post
router.delete("/:id", deletePost);

// etc etc

module.exports = router;
