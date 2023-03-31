/* 
  This component is responsible for displaying a list of posts.
  It is used on the Home page, and is passed the posts as a prop.
  It maps over the posts and displays the title, author, and date of each post.
  Note, each post title is a link to the post detail page, using the react-router-dom Link component.
  The author field was populated on the back end from the author Id.
*/

import { Link } from "react-router-dom";

const PostList = ({ posts }) => {
  // map over the posts and create a list item for each post in an array
  const postListItems = posts.map((post) => {
    return (
      <li key={post._id}>
        <Link to={`/post/${post._id}`}>
          <p>
            <strong>{post.title}</strong>
          </p>
          {/* The author field was populated on the back end from the author Id */}
        </Link>
        <p>
          By: {post.author.email} at {post.createdAt}
        </p>
      </li>
    );
  });

  // render the list of posts
  return (
    <div className="component post-list">
      <h2>PostList Component</h2>
      <ul>{postListItems}</ul>
    </div>
  );
};

export default PostList;
