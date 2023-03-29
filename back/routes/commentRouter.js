const express = require("express");
const { createComment } = require("../controllers/commentController");

const router = express.Router({ mergeParams: true });

// create comment
router.post("/:userId", createComment);

// get comment

// edit comment

// delete comment

// etc etc

module.exports = router;
