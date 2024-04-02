import "./login.css";
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Login() {
  const [error, setError] = useState(false);
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = userRef.current.value.toLowerCase();
    const password = passwordRef.current.value;

    try {
      const res = await axios.post(
        "https://blog-backend-zeta.vercel.app/api/auth/login",
        {
          username,
          password,
        }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      setError(true);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Sign In </span>
      <form className="loginForm" onSubmit={handleSubmit}>
        {error && (
          <p className="errorMessage">
            Invalid username or password. Please try again!
          </p>
        )}
        <div className="label_input">
          <label>Username</label>
          <input
            type="text"
            className="loginInput "
            placeholder="Enter your name ..."
            ref={userRef}
          />
        </div>
        <div className="label_input">
          <label>Password</label>
          <input
            type="password"
            className="loginInput "
            placeholder="Enter your password ..."
            ref={passwordRef}
          />
        </div>
        <button className="loginButton" type="submit" disabled={isFetching}>
          Sign In
        </button>
      </form>
    </div>
  );
}
