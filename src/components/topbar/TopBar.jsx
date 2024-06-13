import "./topbar.css";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

export default function TopBar() {
  const location = useLocation();
  const { user, dispatch } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);
  const [register, setRegister] = useState(false);
  const handleClick = () => {
    if (location.pathname !== "/login" || location.pathname !== "/register") {
      setRegister(!register);
    }
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className={`top ${menuOpen ? "Active" : ""}`}>
      <div
        className={`hamburger ${menuOpen ? "Active" : ""}`}
        onClick={handleClick}
      >
        <div className={`hamburger__line ${menuOpen ? "Active" : ""}`}></div>
        <div className={`hamburger__line ${menuOpen ? "Active" : ""}`}></div>
        <div className={`hamburger__line ${menuOpen ? "Active" : ""}`}></div>
      </div>
      <div className={`topCentre ${menuOpen ? "Active" : ""}`}>
        <ul className="topList">
          <li onClick={handleClick} className="topListItem">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li onClick={handleClick} className="topListItem">
            <Link className="link" to="/">
              About
            </Link>
          </li>
          <li onClick={handleClick} className="topListItem">
            <Link className="link" to="/markdown">
              Markdown
            </Link>
          </li>
          <li onClick={handleClick} className="topListItem">
            <Link className="link" to="/Write">
              Write
            </Link>
          </li>
        </ul>
      </div>
      <div className={`topRight ${menuOpen ? "Active" : ""}`}>
        {user ? (
          <li className="topList logout" onClick={handleLogout}>
            Logout
          </li>
        ) : (
          <ul className="topList">
            <li onClick={handleClick} className="topListItem">
              <Link
                className={
                  location.pathname === "/register" ? "link login" : "link"
                }
                to="/login"
              >
                Sign In
              </Link>
            </li>
            <li onClick={handleClick} className="topListItem">
              <Link
                className={
                  location.pathname === "/login" ? "link register" : "link"
                }
                to="/register"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
