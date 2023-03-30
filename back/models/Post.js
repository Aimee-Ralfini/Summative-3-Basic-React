/* Posts are the main content of the app. They contain a title, content, and author field. 
The author field is a reference to the user's ID in the database, so we'll need to use the populate method to replace the author field with the user's data from the database.
Posts also have comments embedded in them as subdocuments, which is done by importing the Comment model and using the schema as a field in the Post model. */
const mongoose = require("mongoose");

const Comment = require("./Comment.js");

// add comment as a subdocument of post
const postSchema = new mongoose.Schema( // create a new schema
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
    // add comment as a subdocument of post (since Comment is the model which is exported, we can access its schema by calling Comment.schema)
    comments: [Comment.schema],
  },
  {
    // this adds createdAt and updatedAt fields to the schema
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema); // export the model
