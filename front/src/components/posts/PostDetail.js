/*
  This component is responsible for rendering the details of a single post.
  It is used in the Post page, and gets the id of the post to render from the url.
  Using the id, it makes a fetch request to the backend to get the post data.
  It then renders the post data.
  It also renders the CommentCreate component, which is used to create a new comment,
  as well as the CommentDelete component, which is used to delete a comment.

  The comments, and the delete and create imports, should probably be moved to their own component, but I didn't do that here, maybe later.
*/

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import PostDelete from "./PostDelete";
import CommentCreate from "./CommentCreate";
import CommentDelete from "./CommentDelete";

const PostDetail = () => {
  // state to hold the post data
  const [post, setPost] = useState(null);
  // get the id of the post to render from the url
  const { id } = useParams();

  // get the post data when the component mounts
  useEffect(() => {
    // call the getPost function
    getPost();
  }, []);

  // function to make a fetch request to the backend to get the post data
  const getPost = async () => {
    // make a fetch request to the backend to get the post data
    const response = await fetch(`http://localhost:3001/posts/${id}`);
    // get the data from the response
    const data = await response.json();
    // set the post state to the data
    setPost(data);
  };

  // map over the comments array and render each comment
  const comments = post?.comments?.map((comment) => {
    return (
      <div className="comment" key={comment._id}>
        <p>{comment.message}</p>
        <p>By: {comment.author.email}</p>
        <p>At: {comment.createdAt}</p>
        {localStorage.getItem("userId") === comment.author._id ? (
          <CommentDelete
            postId={post._id}
            commentId={comment._id}
            refreshComments={getPost}
          />
        ) : null}
      </div>
    );
  });

  // render the post data
  return (
    <div className="post-detail">
      <h2>Post Detail View</h2>
      {/* if there is a post, render the post, else render nothing */}
      {post ? (
        <div className="post__detail">
          <h3>{post.title}</h3>
          {/* The author is the field that is populated on the backend */}
          <p>By: {post.author.email}</p>
          <p>At: {post.createdAt}</p>
          <p>{post.content}</p>

          {/* if a user id that matches the author of the post is present in the localstorage,
          then that user must be logged in and therefore is allowed to edit and delete, so render the buttons */}
          {localStorage.getItem("userId") === post.author._id ? (
            <div>
              <Link to={`/post/edit/${id}`}>
                <button type="button">Edit</button>
              </Link>
              <PostDelete id={post._id} />
            </div>
          ) : null}
          {localStorage.getItem("userId") ? (
            <CommentCreate id={post._id} refreshComments={getPost} />
          ) : null}
        </div>
      ) : null}
      {comments}
    </div>
  );
};

export default PostDetail;
