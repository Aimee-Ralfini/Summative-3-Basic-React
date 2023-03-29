const mongoose = require("mongoose");

import Comment from "./Comment.js";

// add comment as a subdocument of post
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: { type: String, required: true },
  authorId: { type: mongoose.ObjectId, required: true },
  comments: [Comment],
});

module.exports = mongoose.model("Post", postSchema);
