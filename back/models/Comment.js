const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    authorEmail: { type: String },
    authorId: { type: mongoose.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
