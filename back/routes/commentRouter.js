const express = require("express");
const {
  createComment,
  deleteComment,
} = require("../controllers/commentController");

const router = express.Router({ mergeParams: true });

// create comment
router.post("/:userId", createComment);

// get comment

// edit comment

// delete comment
router.delete("/:commentId", deleteComment);

// etc etc

module.exports = router;
