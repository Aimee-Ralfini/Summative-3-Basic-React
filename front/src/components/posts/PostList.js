import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts/");
    const data = await response.json();
    setPosts(data);
  };

  const postListItems = posts.map((post) => {
    return (
      <li key={post._id}>
        <Link to={`/post/${post._id}`}>
          <h2>{post.title}</h2>
        </Link>
      </li>
    );
  });

  return (
    <div className="posts">
      <h2>post list</h2>
      <ul className="posts__list">{postListItems}</ul>
    </div>
  );
};

export default PostList;
