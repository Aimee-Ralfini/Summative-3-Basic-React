/* 
  This page is for showing the detail of a post, which is largely handled by the PostDetail component
  The page itself is just a container for the PostDetail component really. See the PostDetail component for more details.
*/
import PostDetail from "../components/posts/PostDetail";
const Post = () => {
  return (
    <div className="page post ">
      <h1>Post Page</h1>
      <PostDetail />
    </div>
  );
};

export default Post;
