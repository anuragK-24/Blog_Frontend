import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(
        "https://blogapi-gpp7.onrender.com/api/auth/register",
        {
          username,
          email,
          password,
        }
      );
      res.data && navigate("/login");
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput "
          placeholder="Enter your name ..."
          onChange={(e) => setUsername(e.target.value.toLowerCase())}
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput "
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput "
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          {" "}
          Login{" "}
        </Link>
      </button>
      {error && (
        <span style={{ color: "yellow", marginTop: "15px", fontSize: "25px" }}>
          Something went wrong...
        </span>
      )}
    </div>
  );
}
