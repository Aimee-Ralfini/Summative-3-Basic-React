// Comments are a bit more involved than posts since they are subdocuments of posts.

const Post = require("../models/Post");
const Comment = require("../models/Comment");

/* This code adds a new comment to a post in a database. 
It first finds the post by its ID in the URL parameters, 
then creates a new comment with data from the request body and the user's ID from the URL parameters. 
The comment is added to the post's comments array as a subdocument, 
and the updated post is saved to the database and sent back to the client. */
const createComment = async (req, res) => {
  try {
    // find the post by its ID in the URL params (from the route)
    const post = await Post.findById(req.params.postId);
    // if the post doesn't exist, throw an error
    if (!post) throw new Error("Post not found");
    const comment = new Comment({
      // spread the data from the request body into the new comment
      ...req.body,
      // assign the author field to the user's ID from the URL params (from the route)
      author: req.params.userId,
      // create a new comment with the data from the request body and the user's ID from the URL params (from the route)
    });
    // add the comment to the post's comments array (this is a subdocument)
    post.comments.push(comment);
    // save the post to the database and get the updated post back from the database
    const updatedPost = await post.save();
    // send back the updated post to the client
    res.json(updatedPost);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

/*  The function retrieves a post from the database using the postId parameter in the request object,
removes a comment from the post's comments array using the commentId parameter in the request object, 
saves the updated post to the database, 
and sends back the updated comments array to the client in the response object. 
If an error occurs, the function logs the error message and sends back an error message to the client. */
const deleteComment = async (req, res) => {
  try {
    // find the post by its ID in the URL params
    const post = await Post.findById(req.params.postId);
    // pull the comment from the post's comments array
    post.comments.pull(req.params.commentId);
    // save the post to the database
    const updatedPost = await post.save();
    // send back the updated comments array to the client
    res.json(updatedPost.comments);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

module.exports = { createComment, deleteComment }; // export the controllers
