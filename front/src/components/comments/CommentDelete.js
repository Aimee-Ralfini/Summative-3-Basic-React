/* 
  react component that allows the user to delete a comment by clicking a delete button
  this component is rendered in the PostDetail component and is passed the postId and commentId as props
  It also has a function that is passed in from the PostDetail component that is used to refresh the comments when a comment is deleted
*/

const CommentDelete = ({ postId, commentId, refreshComments }) => {
  // function to handle the delete button click when called
  const handleDelete = async () => {
    // make a fetch request to the backend to delete the comment
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/comments/${commentId}`,
      {
        // use the DELETE method
        method: "DELETE",
      }
    );
    // get the data from the response
    const data = await response.json();
    // run the refreshComments function which is passed in from the PostDetail component, this will refresh the comments
    refreshComments();
  };

  return (
    <div className="component comment-delete">
      <h2>CommentDelete Component</h2>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default CommentDelete;
