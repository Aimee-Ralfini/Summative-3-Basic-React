import { useState, useEffect } from "react";
import PostList from "../components/posts/PostList";
import PostCreate from "../components/posts/PostCreate";
const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts/");
    const data = await response.json();
    setPosts(data);
  };

  const postsUpdatedHandler = (event) => {
    getPosts();
  };

  return (
    <div className="page page--home">
      {localStorage.getItem("userId") ? (
        <PostCreate onSubmit={postsUpdatedHandler} />
      ) : null}
      <PostList posts={posts} />
    </div>
  );
};
export default Home;
