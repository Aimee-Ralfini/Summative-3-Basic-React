/* 
  This is the home page of the application.
  It displays a list of posts, and a form to create a new post.
  If the user is not logged in, they will not be able to see the form to create a new post.
  It checks if the user is logged in by checking if the userId is stored in localStorage.
  If the userId is not stored in localStorage, the user is not logged in.'
*/

import { useState, useEffect } from "react";
// import the PostList and PostCreate components
// PostList displays a list of posts
import PostList from "../components/posts/PostList";
// PostCreate displays a form to create a new post and handles the submission of the form
import PostCreate from "../components/posts/PostCreate";

const Home = () => {
  // state to hold the list of posts
  const [posts, setPosts] = useState([]);

  // get the list of posts when the component mounts
  useEffect(() => {
    getPosts();
  }, []);

  /* 
    function to get the list of posts. This function is called when the component mounts,
    and when a new post is created in the PostCreate component where this function is passed into as a prop 
  */
  const getPosts = async () => {
    // fetch the list of posts from the backend
    const response = await fetch("http://localhost:3001/posts/");
    // get the data from the response
    const data = await response.json();
    // set the posts state to the data
    setPosts(data);
  };

  /* 
    function to handle the event when a new post is created
    this function is passed to the PostCreate component as a prop and is called when a new post is created
    It is not called here, it is called in the PostCreate component
    Note that the PostCreate has two modes, one for creating a new post, and one for editing an existing post.
    Which mode it is in is determined by the presence of the post id prop. If the post id prop is present, it is in edit mode.
    Here, we do not pass in the id of an existing post, so it is in create mode. (see EditPost component for more details)
   */
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
