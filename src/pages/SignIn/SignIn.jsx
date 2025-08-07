import "./SignIn.scss";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import LabelledInput from "../../components/LabelledInput/LabelledInput";
import Login_image from "../../image/signIn.svg";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassword] = useState("");
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          email: email.toLowerCase(),
          password: passWord,
        }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      setEmail("");
      setPassword("");
      setError("* Invalid email or password!");
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/google-login`,
        {
          token: credentialResponse.credential,
        }
      );
      const userData = response.data.user;
      dispatch({ type: "LOGIN_SUCCESS", payload: userData });
    } catch (error) {
      console.error("Google login error:", error);
      dispatch({ type: "LOGIN_FAILURE" });
      setError("Google Login Failed.");
    }
  };

  return (
    <div className="SignIn">
      <div className="SignIn_Content">
        <div className="SignIn_Content_Image">
          <img src={Login_image} alt="SignIn illustration" />
        </div>

        <div className="SignIn_Content_FormContainer">
          <h2 className="SignIn_Heading">Sign In</h2>
          <form
            className="SignIn_Content_FormContainer_Form"
            onSubmit={handleSubmit}
          >
            <LabelledInput
              label="Email"
              type="email"
              placeholder="For demo: test@example.com"
              value={email}
              errorMsg={error}
              onChange={(e) => setEmail(e.target.value)}
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="For demo: 1234"
              value={passWord}
              errorMsg={error}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="SignIn_Content_FormContainer_Form_Button"
              disabled={isFetching}
              type="submit"
            >
              Sign In
            </button>

            <div className="google-login">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onFailure={() => setError("Google Login failed.")}
                useOneTap
              />
            </div>

            <div className="SignIn_Content_FormContainer_Form_Footer">
              <span>Don’t have an account?</span>
              <Link to="/register" className="signup-link">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
