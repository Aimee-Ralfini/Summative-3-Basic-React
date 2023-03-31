// comment functional component, to replace what is currently in the PostDetail component

/* 
  This component is responsible for rendering a single comment.
  It is used in the PostDetail component, and gets the comment data from props.
  It also gets the postId from props, which tells the CommentDelete component which post to delete the comment from.
  The function passed through in the refreshComments prop is the getPost function from the PostDetail component, 
  which is used to refresh the comments when a comment is deleted.
*/

import CommentDelete from "./CommentDelete";

const Comment = ({ comment, postId, refreshComments }) => {
  return (
    <div className="comment">
      <p>{comment.message}</p>
      <p>By: {comment.author.email}</p>
      <p>At: {comment.createdAt}</p>
      {localStorage.getItem("userId") === comment.author._id ? (
        <CommentDelete
          postId={postId}
          commentId={comment._id}
          refreshComments={refreshComments}
        />
      ) : null}
    </div>
  );
};

export default Comment;
