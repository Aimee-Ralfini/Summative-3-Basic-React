import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import PostDelete from "./PostDelete";

const PostDetail = () => {
  const [post, setPost] = useState({});
  const { id: postId } = useParams();

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`http://localhost:3001/posts/${postId}`);
      const data = await response.json();
      setPost(data);
    };
    getPost();
  }, []);

  return (
    <div className="post-detail">
      <h2>Post Detail View</h2>
      {post ? (
        <div className="post__detail">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <Link to={`/post/edit/${postId}`}>
            <button type="button">Edit</button>
          </Link>
          <PostDelete id={postId} />
        </div>
      ) : null}
    </div>
  );
};

export default PostDetail;
