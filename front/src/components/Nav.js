import { useNavigate, NavLink } from "react-router-dom";
const Nav = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  let logoutMarkup;
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
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
      {logoutMarkup}
    </nav>
  );
};
export default Nav;
