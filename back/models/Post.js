const mongoose = require("mongoose");

const Comment = require("./Comment.js");

// add comment as a subdocument of post
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authorEmail: { type: String },
    content: { type: String, required: true },
    authorId: { type: mongoose.ObjectId, required: true },
    comments: [Comment.schema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
