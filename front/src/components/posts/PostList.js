import { Link } from "react-router-dom";

const PostList = ({ posts }) => {
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
