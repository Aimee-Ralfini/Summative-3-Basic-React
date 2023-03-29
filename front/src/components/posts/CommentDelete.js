// react component that allows the user to delete a comment by clicking a delete button
// this component is rendered in the PostDetail component

const CommentDelete = ({ postId, commentId, refreshComments }) => {
  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    console.log(data);
    refreshComments();
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default CommentDelete;
