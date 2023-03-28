import PostCreate from "../components/posts/PostCreate";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const postsUdpatedHandler = () => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="edit-post">
      <h1>Edit Post</h1>
      <PostCreate onSubmit={postsUdpatedHandler} id={id} />
    </div>
  );
};

export default EditPost;
