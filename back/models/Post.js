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
    // This is a reference to the User model, which allows us to populate the author field with the user's data from the database
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [Comment.schema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
