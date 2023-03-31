/* 
  React component that conditionally renders a form to create a comment based on if there is a userID item in localstorage
  if it is present it attaches the userId to the address of the fetch request to the backend
  if it is not present it does not attach the userId to the address of the fetch request to the backend 
*/

import { useState } from "react";
import { useParams } from "react-router-dom";

// This props is a function that is passed in from the PostDetail component and is used to refresh the comments when a new comment is created
const CommentCreate = ({ refreshComments }) => {
  // state to hold the value of the comment input
  const [comment, setComment] = useState("");
  // use the useParams hook to get the id of the post from the url
  const { id } = useParams();

  // function to handle the form submission
  const handleSubmit = async (e) => {
    // do not use default form submission behaviour
    e.preventDefault();

    const response = await fetch(
      // if there is a userId item in localstorage, attach it to the address of the fetch request
      `http://localhost:3001/posts/${id}/comments/${localStorage.getItem(
        "userId"
      )}`,
      {
        // use the POST method
        method: "POST",
        // set the content type to JSON
        headers: {
          "Content-Type": "application/json",
        },
        // send the comment as a JSON string
        body: JSON.stringify({ message: comment }),
      }
    );
    // get the data from the response
    const data = await response.json();
    // run the refreshComments function which is passed in from the PostDetail component
    refreshComments();
  };

  return (
    <div className="component comment-create">
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
