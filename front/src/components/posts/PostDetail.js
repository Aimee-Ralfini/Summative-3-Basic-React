import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import PostDelete from "./PostDelete";

const PostDetail = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`http://localhost:3001/posts/${id}`);
      const data = await response.json();
      setPost(data);
    };
    getPost();
  }, []);

  return (
    <div className="post-detail">
      <h2>Post Detail View</h2>
      {/* if there is a post, render the post, else render nothing */}
      {post ? (
        <div className="post__detail">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {/* if a user id that matches the authorId of the post is present in the localstorage,
          then that user must be logged in and therefore is allowed to edit and delete, so render the buttons */}
          {localStorage.getItem("userId") === post.authorId ? (
            <div>
              <Link to={`/post/edit/${id}`}>
                <button type="button">Edit</button>
              </Link>
              <PostDelete id={post._id} />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default PostDetail;
