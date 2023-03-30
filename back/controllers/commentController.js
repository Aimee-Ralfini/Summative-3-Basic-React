const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

const createComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId); // find the post by its ID in the URL params (from the route) and get the post back from the database
    if (!post) throw new Error("Post not found"); // if the post doesn't exist, throw an error
    const author = await User.findById(req.params.userId); // find the user by their ID in the URL params (from the route) and get the user back from the database
    if (!author) throw new Error("User not found"); // if the user doesn't exist, throw an error
    const comment = new Comment({
      ...req.body,
      authorEmail: author.email,
      authorId: req.params.userId,
    }); // create a new comment with the message and author ID
    post.comments.push(comment); // add the comment to the post's comments array (this is a subdocument)
    const updatedPost = await post.save(); // save the post to the database and get the updated post back from the database
    res.json(updatedPost); // send back the updated post to the client
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    post.comments.pull(req.params.commentId); // pull the comment from the post's comments array
    const updatedPost = await post.save(); // save the post to the database
    res.json(updatedPost.comments); // send back the updated comments array to the client
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

module.exports = { createComment, deleteComment };
