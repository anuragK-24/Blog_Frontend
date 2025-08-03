// src/pages/ErrorPage/ErrorPage.jsx
import { Link } from "react-router-dom";
import "./ErrorPage.scss";

export default function ErrorPage() {
  return (
    <div className="error-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="home-button">Go to Home</Link>
    </div>
  );
}
