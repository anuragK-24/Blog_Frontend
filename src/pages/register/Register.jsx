import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [passwordError,setPasswordError] = useState(false);


  function isValidEmail(email) {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  }
  function isStrongPassword(password) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorEmail(false);
    if (!isValidEmail(email) && !isStrongPassword(password)) {
      setErrorEmail("Please enter a valid email.");
      setPasswordError(
        "Invalid password format."
      );
      return;
    }
    if (!isValidEmail(email)) {
      setErrorEmail("Please enter a valid email.");
      return;
    }
    
  if (!isStrongPassword(password)) {
    setPasswordError(
      "Invalid password format."
    );
    return;
  }
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
    } catch (errorEmail) {
      setErrorEmail(true);
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
        {errorEmail && (
          <p
            style={{ color: "red", fontSize: "15px" }}
          >
            {errorEmail}
          </p>
        )}
        <label>Password</label>
        <input
          type="password"
          className="registerInput "
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && (
          <p
            style={{ color: "red", fontSize: "15px" }}
          >
            {passwordError}
          </p>
        )}
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
    </div>
  );
}
