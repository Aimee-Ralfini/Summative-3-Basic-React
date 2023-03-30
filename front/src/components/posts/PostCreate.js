import { useState, useEffect } from "react";

/* 
  This component has two modes, create and edit. Depending on the mode, the component will either create a new post or edit an existing post.
  The mode is determined by the id prop. If the id prop is passed in, the component will be in edit mode, and will edit the post with the id that is passed in.
  The mode switching is done using ternary operators. If the id prop is passed in, the ternary operators will use PUT instead of POST and add the id of the post being edited to the URL.
  If the id prop is not passed in, the ternary operators will use POST and the id of the user creating the post will be added instead.
  This matches with the backend API, which uses PUT to update a post and POST to create a new post, and expects the id of the post to be updated or the id of the user creating the post to be added to the URL depending on the method.

  Basically, if the id prop is passed in, the component will fetch the post to be edited and update the state with the data from the post, filling in the form fields with the data from the post.
  Then on submit, the component will send a PUT request to the backend API to update the post.

  Otherwise, if the id prop is not passed in, the component will create a new post. The form fields will be empty, and on submit, the component will send a POST request to the backend API to create a new post.
*/
const PostCreate = ({ onSubmit, id: postToBeEditedId }) => {
  /*
    state to store the values of the form fields. 
    These are updated whenever the input value changes using the handlers below 
    that react to the input change event on the form fields
  */
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // This effect is used to get the post to be edited IF and ONLY IF the id prop is passed in (edit mode)
  useEffect(() => {
    // if the id prop is passed in, get the post to be edited
    if (postToBeEditedId) {
      // first, define a function to get the post to be edited
      const getPost = async () => {
        // the function will use the id prop to get the post to be edited from the backend API
        const response = await fetch(
          `http://localhost:3001/posts/${postToBeEditedId}`
        );
        // get the data from the response
        const data = await response.json();
        // once the data is received, update the state to the data, which will update the form fields
        setTitle(data.title);
        setContent(data.content);
      };

      // then call the function to get the post to be edited
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

  /*
    This function is used to submit the form. It checks if the postToBeEditedId is present. 
    If it is, it will update the post. If it is not, it will create a new post.
  */
  const submitForm = async () => {
    const userInputPostData = {
      title,
      content,
    };
    /*
      If the post is being edited the ternary operators will use PUT instead of POST and add the id of the post being edited to the URL
      otherwise if the post is being created it will use POST and the id of the user creating the post
    */
    const response = await fetch(
      `http://localhost:3001/posts/${
        postToBeEditedId ? postToBeEditedId : localStorage.getItem("userId") // this is the id of the post being edited, or the id of the user creating the post
      }`,
      {
        // if there is an id, use PUT, otherwise use POST
        method: postToBeEditedId ? "PUT" : "POST",
        // set the content type to JSON
        headers: { "Content-Type": "application/json" },
        // send the new post data as the request body
        body: JSON.stringify(userInputPostData),
      }
    );
    // get the data from the response
    const data = await response.json();
    // reset the form fields
    setTitle("");
    setContent("");
    // call the onSubmit function passed in as a prop to the component, which lets the parent component know that the form has been submitted
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
