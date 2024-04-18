import "./SignUp.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import LabelledInput from "../../components/LabelledInput/LabelledInput";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  function isValidEmail(email) {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  }

  function isStrongPassword(password) {
    if (password.length < 8) {
      return false;
    }

    if (!/[a-z]/.test(password)) {
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      return false;
    }

    if (!/\d/.test(password)) {
      return false;
    }

    if (!/[@$!%*?&#]/.test(password)) {
      return false;
    }

    return true;
  }

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorEmail(false);
    if (!isValidEmail(email) && !isStrongPassword(password)) {
      setErrorEmail("Please enter a valid email.");
      setPasswordError(
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character."
      );
      return;
    }
    if (!isValidEmail(email)) {
      setErrorEmail("Please enter a valid email.");
      return;
    }

    if (!isStrongPassword(password)) {
      setPasswordError(
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character."
      );
      return;
    }
    try {
      const res = await axios.post(
        "https://blog-backend-zeta.vercel.app/api/auth/register",
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
    <div className="SignUp">
      <span className="SignUpTitle">Sign Up</span>
      <form className="SignUpForm" onSubmit={handleSubmit}>
        <LabelledInput
          label="Username"
          type="text"
          value={username}
          placeholder="Enter your name ..."
          onChange={(e) => setUsername(e.target.value.toLowerCase())}
        />
        <div className="label_input">
          <LabelledInput
            label="Email"
            type="text"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          />
          {errorEmail && (
            <p style={{ color: "red", fontSize: "15px" }}>{errorEmail}</p>
          )}
        </div>
        <div className="label_input">
          <LabelledInput
            label={"Password"}
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <p style={{ color: "red", fontSize: "15px" }}>{passwordError}</p>
          )}
        </div>
        <button className="SignUpButton" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
