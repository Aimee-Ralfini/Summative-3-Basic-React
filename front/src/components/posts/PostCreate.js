import { useState } from "react";
const PostCreate = ({ onNewPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthor] = useState("");

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const contentHandler = (event) => {
    setContent(event.target.value);
  };

  const authorHandler = (event) => {
    setAuthor(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    submitForm();
  };

  const submitForm = async () => {
    const newPost = { title, content, authorId };
    const response = await fetch("http://localhost:3001/posts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });
    const data = await response.json();
    if (response.ok) {
      onNewPost(data);
    }
  };

  return (
    <div className="post__create">
      <h2>Create New Post</h2>
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
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostCreate;
