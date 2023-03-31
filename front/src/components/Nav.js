/*
The Nav component renders a Navigation Menu using react router. 
It also contains logic to conditionally render a logout button based on if there is a userId item in localstorage.
The login/logout system is based on the userId item in localstorage. If it is present the user is logged in.
If it is not present the user is logged out. This system is not secure and is only used for demonstration purposes.
Logout is handled here by removing the userId and userEmail items from localstorage when the logout button is clicked.
This button is only rendered if the userId item is present in localstorage.

Login is handled in the Login component. When the user logs in, the userId and userEmail items are added to localstorage.
*/

import { NavLink } from "react-router-dom";
const Nav = ({ setLoggedInState }) => {
  // function to remove the userId and userEmail items from localstorage
  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    setLoggedInState(false);
  };

  // variable to hold the logout button
  let logoutMarkup;

  // if the userId item is present in localstorage, render the logout button
  if (localStorage.getItem("userId")) {
    logoutMarkup = (
      <div>
        <p>Hello, {localStorage.getItem("userEmail")}</p>
        <button type="button" onClick={logout}>
          Log Out
        </button>
      </div>
    );
  } else {
    logoutMarkup = null;
  }

  // render the navigation menu
  return (
    <nav className="component nav">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {localStorage.getItem("userId") ? null : (
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        )}
        {localStorage.getItem("userId") ? null : (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
      {logoutMarkup}
    </nav>
  );
};
export default Nav;
