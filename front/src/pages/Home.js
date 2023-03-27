import PostList from "../components/posts/PostList";
import PostCreate from "../components/posts/PostCreate";
const Home = () => {
  const newPostHandler = (event) => {
    console.log(event);
  };

  return (
    <div className="page page--home">
      <PostCreate onNewPost={newPostHandler} />

      <PostList />
    </div>
  );
};
export default Home;
