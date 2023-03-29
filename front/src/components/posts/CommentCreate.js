// react component that conditionally renders a form to create a comment based on if there is a userID item in localstorage
// if it is present it attaches the userId to the address of the fetch request to the backend
// if it is not present it does not attach the userId to the address of the fetch request to the backend

import { useState } from "react";
import { useParams } from "react-router-dom";
const CommentCreate = ({ refreshComments }) => {
  const [comment, setComment] = useState("");
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:3001/posts/${id}/comments/${localStorage.getItem(
        "userId"
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: comment }),
      }
    );
    const data = await response.json();
    refreshComments();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment">Comment</label>
        <input
          type="text"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
