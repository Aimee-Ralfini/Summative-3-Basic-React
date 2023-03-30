import { Link } from "react-router-dom";

const PostList = ({ posts }) => {
  const postListItems = posts.map((post) => {
    return (
      <li key={post._id}>
        <Link to={`/post/${post._id}`}>
          <h2>{post.title}</h2>
          {/* The author field was populated on the back end from the author Id */}
        </Link>
        <p>
          By: {post.author.email} at {post.createdAt}
        </p>
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
