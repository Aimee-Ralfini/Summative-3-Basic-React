/* 
  This file contains all the routes for the application.
  It is imported into App.js, and the routes are rendered there.
  The routes are rendered using the react-router-dom Routes component.

  Note the setLoggedInState prop, which is passed to the Login component.
  This prop is used to set the loggedIn state in App.js. The purpose of this
  is to allow the Nav component to call this function when the user logs in or out, 
  which will cause the App component to re-render, which will cause the Nav component to re-render as well.
  This is necessary because the Nav component needs to re-render when the user logs in or out so that the login/logout button
  can be rendered or removed. 

  The prop is being passed through the AppRoutes component but is not used here, it is just being passed through to the Login component.
  This is called prop drilling, and it is a common pattern in React. App.js -> AppRoutes.js -> Login.js
  */

// import react-router-dom components
import { Route, Routes } from "react-router-dom";

// import all the pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Post from "./pages/Post";
import EditPost from "./pages/EditPost";

const AppRoutes = ({ setLoggedInState }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/login"
        element={<Login setLoggedInState={setLoggedInState} />}
      />
      <Route path="/post/:id" element={<Post />} />
      <Route path="/post/edit/:id" element={<EditPost />} />
    </Routes>
  );
};
export default AppRoutes;
