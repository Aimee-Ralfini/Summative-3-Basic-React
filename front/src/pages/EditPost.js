/*
  This page is used to edit a post. 
  This is largely handled by the PostCreate component, which is used to create a post, but also to edit a post.
  The PostCreate component has two modes, create and edit. Depending on the mode, the component will either create a new post or edit an existing post.
  This is handled by the id prop, which is passed into the PostCreate component. If the id prop is passed in, the component will be in edit mode, and will edit the post with the id that is passed in.
  If the id prop is not passed in, the component will be in create mode, and will create a new post.
  Since this is the edit page, the id prop is passed in, and the PostCreate component will be in edit mode.
  On the Home page, the PostCreate component is used to create a new post, and the id prop is not passed in, so the PostCreate component is in create mode. (see the Home page for more details)
*/
import PostCreate from "../components/posts/PostCreate";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  // get the id of the post to edit from the url
  const { id } = useParams();
  const navigate = useNavigate();

  /* 
    function to handle the event when a post is updated
    this function is passed to the PostCreate component as a prop and is called when a post is updated
    It is not called here, it is called in the PostCreate component
  */
  const postsUdpatedHandler = () => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="page edit-post">
      <h1>Edit Post Page</h1>
      <PostCreate onSubmit={postsUdpatedHandler} id={id} />
    </div>
  );
};

export default EditPost;
