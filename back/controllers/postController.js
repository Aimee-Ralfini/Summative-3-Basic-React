/* Posts require full CRUD functionality, so we'll need to create controllers for all four CRUD operations.
Posts contain an author field, which is a reference to the user's ID in the database, so we'll need to use the populate method to replace the author field with the user's data from the database.
Populate is a method that replaces the specified field with the data from the referenced model. This gives us access to the user's emails and usernames.
Since posts have comments embedded in them, which have their own authors, we'll need to use the populate method to replace the comment author fields with the user's data from the database too. */

const Post = require("../models/Post");

const getPosts = async (req, res) => {
  try {
    /* The populate method will replace the author field (which contains the ID of the User who created the post) with the user's data from the database, so we can access the user's emails and usernames
     This only works if the author field is a reference to the user's ID in the database (see the post model) */

    // populate the author field with the user's data from the database
    const posts = await Post.find({}).populate("author");
    // send the posts back to the client
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

const getPost = async (req, res) => {
  try {
    /* The populate method will replace the author field (which contains the ID of the User who created the post) with the user's data from the database, so we can access the user's emails and usernames
     This only works if the author field is a reference to the user's ID in the database (see the post model) */
    const post = await Post.findById(req.params.postId)
      // populate the author field with its user's data from the database
      .populate("author")
      // populate the author field of each comment with their user's data from the database
      .populate("comments.author");
    // send the post back to the client
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = {
      // spread the data from the request body into the new post
      ...req.body,

      // Assign the author field to the user's ID from the URL params (from the route)
      // This will allow us to populate the author field with the user's data from the database (see the getPost controller)
      author: req.params.userId,
    };
    // create a new post with the data from the request body and the user's ID from the URL params (from the route)
    const post = await Post.create(newPost);
    // send the post back to the client
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

const editPost = async (req, res) => {
  try {
    // find the post by its ID in the URL params
    const post = await Post.findById(req.params.postId);
    // update the post's title with the data from the request body
    post.title = req.body.title;
    // update the post's content with the data from the request body
    post.content = req.body.content;
    // save the updated post to the database
    post.save();
    // send the updated post back to the client
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    // find the post by its ID in the URL params and delete it from the database
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    // send the deleted post back to the client
    res.json(deletedPost);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

// export the controllers
module.exports = { getPosts, getPost, createPost, editPost, deletePost };
