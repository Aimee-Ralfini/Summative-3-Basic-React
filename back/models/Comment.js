const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  message: { type: String, required: true },
  authorId: { type: mongoose.ObjectId, required: true },
});

module.exports = mongoose.model("Comment", commentSchema);
