const Post = require("../models/Post");
const Comment = require("../models/Comment");

const createComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId); // find the post by its ID in the URL params (from the route) and get the post back from the database
    if (!post) throw new Error("Post not found"); // if the post doesn't exist, throw an error
    const comment = new Comment({ ...req.body, authorId: req.params.userId }); // create a new comment with the message and author ID
    post.comments.push(comment); // add the comment to the post's comments array (this is a subdocument)
    const updatedPost = await post.save(); // save the post to the database and get the updated post back from the database
    res.json(updatedPost); // send back the updated post to the client
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

module.exports = { createComment };
