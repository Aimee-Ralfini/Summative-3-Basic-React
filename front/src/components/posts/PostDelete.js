import { useNavigate } from "react-router-dom";
const PostDelete = ({ id }) => {
  const navigate = useNavigate();

  const deletePost = async () => {
    const response = await fetch(`http://localhost:3001/posts/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    navigate("/");
  };

  return (
    <div className="post__delete">
      <button
        onClick={(e) => {
          deletePost();
        }}
      >
        Delete Post
      </button>
    </div>
  );
};

export default PostDelete;
