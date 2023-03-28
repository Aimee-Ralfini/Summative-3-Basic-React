import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Login = ({ setLoggedInState }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    // do not use default form submission behaviour
    event.preventDefault();
    // call submit function to create new user
    loginUser();
  };

  const loginUser = async () => {
    const user = { email, password };

    const response = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();

    if (data.error) {
      console.log(data.error);
    } else {
      localStorage.setItem("userId", data._id);
      localStorage.setItem("userEmail", data.email);
      setLoggedInState(true);
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
