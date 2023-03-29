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
router.post("/", createPost);

// get posts
router.get("/", getPosts);

// get post
router.get("/:id", getPost);

// edit post
router.put("/:id", editPost);

// delete post
router.delete("/:id", deletePost);

// comments routes
router.use("/:postId/comments", require("./commentRouter"));

module.exports = router;
