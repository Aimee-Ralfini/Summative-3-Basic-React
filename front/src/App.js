import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import Nav from "./components/Nav";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState("");
  const storedUserEmail = localStorage.getItem("user");

  console.log(`is user logged in: ${userLoggedIn}`);

  // check if user is already logged in when the component first loads, and if so, set state true
  useEffect(() => {
    if (storedUserEmail) {
      setUserLoggedIn(true);
    }
  }, []);

  // if log state changes, take log state value and send it to updater
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
