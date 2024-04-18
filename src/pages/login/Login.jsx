import "./login.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import LabelledInput from "../../components/LabelledInput/LabelledInput";

export default function Login() {
  const [error, setError] = useState(false);
  const [userName, setUserName] = useState("");
  const [passWord, setPassword] = useState("");

  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = userName.toLowerCase();
    const password = passWord;

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

      {error && (
        <p className="errorMessage">
          Invalid username or password. Please try again!
        </p>
      )}
      <LabelledInput
        label="Username"
        type="text"
        placeholder="Enter your name ..."
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <LabelledInput
        label="Password"
        type="password"
        placeholder="Enter your password ..."
        value={passWord}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="loginButton"
        disabled={isFetching}
        onClick={handleSubmit}
      >
        Sign In
      </button>
    </div>
  );
}
