const express = require("express");
// import the controller functions
const {
  createComment,
  deleteComment,
} = require("../controllers/commentController");

// create a router, and set mergeParams to true so that we can access the params from the parent router
const router = express.Router({ mergeParams: true });

// create comment
router.post("/:userId", createComment);

// get comment

// edit comment

// delete comment
router.delete("/:commentId", deleteComment);

// etc etc

module.exports = router;
