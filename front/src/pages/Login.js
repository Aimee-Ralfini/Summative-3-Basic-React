/*
  This component renders a form that allows the user to log in. The Prop that is passed to this component is setLoggedInState, which is a function that sets the loggedIn state in App.js.
  This is just there to force a re-render of the Nav component, so that the logout button is rendered. The actual login system is based on the userId item in localstorage.
*/

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = ({ setLoggedInState }) => {
  // useNavigate hook from react router to navigate to different pages
  const navigate = useNavigate();

  // state to hold the email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // functions to handle the email and password input
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  // function to handle the form submission
  const submitHandler = (event) => {
    // do not use default form submission behaviour
    event.preventDefault();
    // call submit function to create new user
    loginUser();
  };

  // function to log a user in
  const loginUser = async () => {
    // create a user object to send to the server
    const user = { email, password };
    //
    const response = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // send the user object as a JSON string
      body: JSON.stringify(user),
    });
    // get the data from the response
    const data = await response.json();

    // if there is an error, log it to the console
    if (data.error) {
      console.log(data.error);
      // if there is no error, log the user in
    } else {
      // set the userId and userEmail items in localstorage
      localStorage.setItem("userId", data._id);
      localStorage.setItem("userEmail", data.email);
      // set the loggedIn state to true (remember, this is just to force a re-render of the Nav component)
      setLoggedInState(true);
      // navigate to the home page
      navigate("/");
    }
  };

  return (
    <div className="page page--login">
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={emailHandler}
            type="email"
            name="email"
            value={email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={passwordHandler}
            type="password"
            name="password"
            value={password}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};
export default Login;
