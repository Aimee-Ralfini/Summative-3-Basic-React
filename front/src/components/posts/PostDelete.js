/*
  This component is used to delete a post.
  It is used in the Comment component.
  It is passed the id of the post to delete as a prop.
  When the delete button is clicked, it makes a fetch request to the backend to delete the post.
*/
import { useNavigate } from "react-router-dom";
const PostDelete = ({ id }) => {
  // use the useNavigate hook to navigate to a different page
  const navigate = useNavigate();

  // function that makes a fetch request to the backend to delete the post
  const deletePost = async () => {
    // make a fetch request to the backend to delete the post
    const response = await fetch(`http://localhost:3001/posts/${id}`, {
      // use the DELETE method
      method: "DELETE",
    });
    // get the data from the response (not actually used anywhere so could be removed)
    const data = await response.json();
    // navigate to the home page
    navigate("/");
  };

  return (
    <div className="component post-delete">
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
