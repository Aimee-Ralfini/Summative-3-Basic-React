import { useState, useEffect } from "react";

// this component has two modes
// if the id prop has a value passed to it the component assumes this is the id of a post it is meant to edit
// if there isn't a value it assumes a new post is being created
// the onSubmit prop just there so that the parent knows when a post is created/edited so it can refetch the data
const PostCreate = ({ onSubmit, id }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthor] = useState("");

  // if there is an id, fetch the matching post data from the API
  useEffect(() => {
    if (id) {
      const getPost = async () => {
        const response = await fetch(`http://localhost:3001/posts/${id}`);
        const data = await response.json();
        // set the values of the fields to the values of the existing post
        setTitle(data.title);
        setContent(data.content);
        setAuthor(data.authorId);
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

  const authorHandler = (event) => {
    setAuthor(event.target.value);
  };

  // this handler reacts to form submission and overrules the default form behaviour
  const submitHandler = (event) => {
    event.preventDefault();
    submitForm();
  };

  // this function is called on submit and sends the data to the API
  // if an id is present (edit mode) it attaches the id to the request address
  // it also switches the request method from POST to PUT
  // these changes mean the data is matched with the edit route on the API ('PUT to posts/:id' vs 'POST to posts/')
  const submitForm = async () => {
    const newPost = { title, content, authorId };
    const response = await fetch(
      `http://localhost:3001/posts/${id ? id : ""}`,
      {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      }
    );
    const data = await response.json();
    if (response.ok) {
      onSubmit(data);
    }
  };

  return (
    <div className="post__create">
      {/* change title depending on id presence */}
      {id ? <h2>Editing: {title}</h2> : <h2>Create New Post</h2>}
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
        <div className="form-group">
          <label htmlFor="author">Author Id</label>
          <input
            onChange={authorHandler}
            type="text"
            name="author"
            value={authorId}
          />
        </div>
        {title}
        <br />
        {content}
        <br />
        {authorId}
        {/* change button text depending on id presence */}
        <button type="submit">{id ? "Submit Edit" : "Create Post"}</button>
      </form>
    </div>
  );
};

export default PostCreate;
