import "./SignUp.scss";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import LabelledInput from "../../components/LabelledInput/LabelledInput";
import SignUp_image from "../../image/signUp.svg";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  function isValidEmail(email) {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  }

  function isStrongPassword(password) {
    return (
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[@$!%*?&#]/.test(password)
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorEmail("");
    setPasswordError("");

    if (!isValidEmail(email) && !isStrongPassword(password)) {
      setEmail("");
      setPassword("");
      setErrorEmail("* Please enter a valid email.");
      setPasswordError(
        "* Must be 8+ characters with uppercase, number & special character."
      );
      return;
    }

    if (!isValidEmail(email)) {
      setEmail("");
      setErrorEmail("* Please enter a valid email.");
      return;
    }

    if (!isStrongPassword(password)) {
      setPassword("");
      setPasswordError(
        "* Must be 8+ characters with uppercase, number & special character."
      );
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        {
          username,
          email,
          password,
        }
      );
      res.data && navigate("/login");
    } catch (err) {
      setErrorEmail("* Registration failed. Try again.");
    }
  };

  return (
    <div className="SignUp">
      <div className="SignUp_Content">
        <div className="SignUp_Content_FormContainer">
          <h2 className="SignUp_Heading">Sign Up</h2>
          <form
            className="SignUp_Content_FormContainer_Form"
            onSubmit={handleSubmit}
          >
            <LabelledInput
              label="Username"
              type="text"
              placeholder="Enter your name ..."
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
            />
            <LabelledInput
              label="Email"
              type="email"
              placeholder="Enter your email..."
              value={email}
              errorMsg={errorEmail}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="Enter your password..."
              value={password}
              errorMsg={passwordError}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="SignUp_Content_FormContainer_Form_Button"
              type="submit"
            >
              Sign Up
            </button>

            <div className="SignUp_Content_FormContainer_Form_Footer">
              <span>Already have an account?</span>
              <Link to="/login" className="signin-link">
                Sign in
              </Link>
            </div>
          </form>
        </div>
        <div className="SignUp_Content_Image">
          <img src={SignUp_image} alt="SignUp illustration" />
        </div>
      </div>
    </div>
  );
}
