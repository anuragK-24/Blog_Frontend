import React, { useContext, useState } from "react";
import "./TopBar.scss";
import { FaBars, FaTimes } from "react-icons/fa";
import { Context } from "../../context/Context";
import Sidebar from "../Sidebar/Sidebar";

const TopBar = () => {
  const [open, setOpen] = useState(false);
  const { user, dispatch } = useContext(Context);

  const headingData = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Write", url: "/write" },
    { name: "Markdown", url: "/markdown" }, 
  ];
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <nav className="navbar">
      {open && <Sidebar />}
      <button
        className="hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      <a className="endElement" href="/">
        BlogSpark
      </a>

      <ul className={`navLinks ${open ? "active" : ""}`}>
        {headingData.map((item, index) => (
          <li key={index}>
            <a href={item.url}>{item.name}</a>
          </li>
        ))}
      </ul>

      {user ? (
        <div className="navbar__user">
          <div className="navbar__toggle">
            Hi, {user.username.toUpperCase()}!
          </div>
          <div className="navbar__SignOut" onClick={handleLogout}>
            Sign Out
          </div>
        </div>
      ) : (
        <div className="Session">
          <a href="/login" className="Session__link">
            Sign In
          </a>{" "}
          /
          <a href="/register" className="Session__link">
            Sign Up
          </a>
        </div>
      )}
    </nav>
  );
};

export default TopBar;
