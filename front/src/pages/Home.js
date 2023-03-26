import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts/");
    const data = await response.json();
    setPosts(data);
  };

  const postList = posts.map((post) => {
    return (
      <li key={post._id}>
        <h2>{post.title}</h2>
        {localStorage.getItem("userId") === post.authorId ? (
          <button
            onClick={() => {
              deletePost(post._id);
            }}
          >
            Delete
          </button>
        ) : null}
      </li>
    );
  });

  const deletePost = async (postId) => {
    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    getPosts();
  };

  return (
    <div className="page page--home">
      <ul>
        <h1>Home</h1>
        {postList}
      </ul>
    </div>
  );
};
export default Home;
