/*
  This is the main component of the app. It is the parent of all other components.
  It is responsible for rendering the Nav component, which is the navigation bar at the top of the page.
  It is also responsible for rendering the AppRoutes component, which is the component that renders the routes for the app.
  
  The App component also has a state to keep track of whether the user is logged in or not. This doesn't actually do anything,
  but it is used to force a re-render of the component when the user logs in or out. This is necessary because the Nav component
  is rendered in the App component, and it needs to re-render when the user logs in or out so that the login/logout button
  can be rendered or removed. By passing the a function to the Nav component that sets the state of the App component, the
  Nav component can call that function when the user logs in or out, which will cause the App component to re-render, which
  all of its children, including the Nav component to also re-render.

  This is also true for the AppRoutes component. It is rendered in the App component, and it needs to re-render when the user
  logs in or out so that any components that show or hide (for example, the CreatePost component, or the edit and delete buttons) can be rendered or removed.

  Basically, any component that needs to re-render when the user logs in or out can be passed a function that sets the state of the App component.
  Calling this function will cause the App component to re-render, which will cause all of its children to re-render as well.
  */

import "./App.scss";
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import Nav from "./components/Nav";

function App() {
  // state to keep track of whether the user is logged in or not
  const [userLoggedIn, setUserLoggedIn] = useState("");
  // get the user's email from local storage
  const storedUserEmail = localStorage.getItem("user");

  // check if user is already logged in when the component first loads, and if so, set state true
  useEffect(() => {
    if (storedUserEmail) {
      setUserLoggedIn(true);
    }
  }, []);

  /*
    this function is passed to both the Nav and AppRoutes components, so that they can call it when the user logs in or out
    its purpose is to set the userLoggedIn state to true or false, which will cause the App component to re-render
    this allows the Nav and AppRoutes components to re-render as well, so that any conditional logic that depends on the user being logged in or not can be executed
    in order to reflect the correct state of the app. (see the comments in the Nav and AppRoutes (which is the routes.js file) components for more info)
  */
  const userChangeHandler = (isLoggedIn) => {
    setUserLoggedIn(isLoggedIn);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Nav setLoggedInState={userChangeHandler} />
        <AppRoutes setLoggedInState={userChangeHandler} />
      </div>
    </BrowserRouter>
  );
}

export default App;
