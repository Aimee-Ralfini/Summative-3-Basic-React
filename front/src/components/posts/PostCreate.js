import { useState, useEffect } from "react";

// this component has two modes
// if the id prop has a value passed to it the component assumes this is the id of a post it is meant to edit
// if there isn't a value it assumes a new post is being created
// the onSubmit prop just there so that the parent knows when a post is created/edited so it can refetch the data
const PostCreate = ({ onSubmit, id: postToBeEditedId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // if there is an id, fetch the matching post data from the API
  useEffect(() => {
    if (postToBeEditedId) {
      const getPost = async () => {
        const response = await fetch(
          `http://localhost:3001/posts/${postToBeEditedId}`
        );
        const data = await response.json();
        // set the values of the fields to the values of the existing post
        setTitle(data.title);
        setContent(data.content);
      };
      getPost();
    }
  }, []);

  // these handlers react to the input and update the state whenever the input value changes
  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const contentHandler = (event) => {
    setContent(event.target.value);
  };

  // this handler reacts to form submission and overrules the default form behaviour
  const submitHandler = (event) => {
    event.preventDefault();
    submitForm();
  };

  // This function is used to submit the form. It checks if the postToBeEditedId is present. If it is, it will update the post. If it is not, it will create a new post.

  const submitForm = async () => {
    const newPost = {
      title,
      content,
    };

    // if the post is being edited the ternary operators will use PUT instead of POST and add the id of the post being edited to the URL
    // otherwise if the post is being created it will use POST and the id of the user creating the post
    const response = await fetch(
      `http://localhost:3001/posts/${
        postToBeEditedId ? postToBeEditedId : localStorage.getItem("userId") // this is the id of the post being edited, or the id of the user creating the post
      }`,
      {
        method: postToBeEditedId ? "PUT" : "POST", // if there is an id, use PUT, otherwise use POST
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      }
    );
    const data = await response.json();
    setTitle("");
    setContent("");
    if (response.ok) {
      onSubmit(data);
    }
  };

  return (
    <div className="post__create">
      {/* change title depending on id presence */}
      {postToBeEditedId ? <h2>Editing: {title}</h2> : <h2>Create New Post</h2>}
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            onChange={titleHandler}
            type="text"
            name="title"
            value={title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <input
            onChange={contentHandler}
            type="textarea"
            name="content"
            value={content}
          />
        </div>
        {/* change button text depending on id presence */}
        <button type="submit">
          {postToBeEditedId ? "Submit Edit" : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default PostCreate;
