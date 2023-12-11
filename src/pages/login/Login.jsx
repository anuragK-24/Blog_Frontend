import "./login.css";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = userRef.current.value.toLowerCase();
    const password = passwordRef.current.value;

    // if (!isStrongPassword(password)) {
    //   setError(
    //     "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
    //   );
    //   return;
    // }

    try {
      const res = await axios.post(
        "https://blogapi-gpp7.onrender.com/api/auth/login",
        {
          username,
          password,
        }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login </span>
      {/* {error && <p className="errorMessage">{error}</p>} */}
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput "
          placeholder="Enter your name ..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput "
          placeholder="Enter your password ..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          {" "}
          Register{" "}
        </Link>
      </button>
    </div>
  );
}
