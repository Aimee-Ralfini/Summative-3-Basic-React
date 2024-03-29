/* Comments are stored as part of posts, so this shcmea is imported into the Post model, where it is used as a subdocument.
Comments also have an author field that contains a reference to the user that created the comment.
This reference allows us to populate the author field with the user's data from the database, so we can access the user's emails and usernames. */
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema( // create a new schema
  {
    message: { type: String, required: true },
    // this is a reference to the User model, which allows us to populate the author field with the user's data from the database
    author: {
      type: mongoose.Schema.Types.ObjectId,
      // this is the model we are referencing
      ref: "User",
      required: true,
    },
  },
  {
    // this adds createdAt and updatedAt fields to the schema
    timestamps: true,
  }
);

// export the model. Note, to add this as a subdocument to the Post model, we need the schema, not the model, so in the Post model, we call Comment.schema
module.exports = mongoose.model("Comment", commentSchema);
