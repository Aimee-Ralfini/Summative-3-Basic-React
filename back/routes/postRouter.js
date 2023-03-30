const express = require("express");
const {
  getPost,
  getPosts,
  createPost,
  editPost,
  deletePost,
} = require("../controllers/postController");

const router = express.Router();

// create post
router.post("/:userId", createPost);

// get posts
router.get("/", getPosts);

// get post
router.get("/:postId", getPost);

// edit post
router.put("/:postId", editPost);

// delete post
router.delete("/:postId", deletePost);

// comments routes
router.use("/:postId/comments", require("./commentRouter"));

module.exports = router;
