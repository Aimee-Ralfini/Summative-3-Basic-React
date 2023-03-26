import { useState } from "react";
const Register = () => {
  // STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // HANDLERS

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
    submitNewUser();
  };

  // FUNCTIONS
  const submitNewUser = async (user) => {
    // get form values and put them into an object
    const newUser = { email, password };
    // send a request to the back end
    const response = await fetch("http://localhost:3001/users/register", {
      // set request method to POST
      method: "POST",
      // set request data type to JSON
      headers: { "Content-Type": "application/json" },
      // JSONify and attach the user object created above to the request body
      body: JSON.stringify(newUser),
    });

    // decode the response from the back end
    const data = await response.json();

    // log it
    console.log(data);
  };

  // RENDER TEMPLATE
  return (
    <div className="page page--register">
      <h1>Register</h1>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
export default Register;
