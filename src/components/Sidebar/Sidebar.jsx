import React, { useContext } from "react";
import { Context } from "../../context/Context";
import "./Sidebar.scss";
import { Link } from "react-router-dom";

const Sidebar = ({ onClose }) => {
  const { user, dispatch } = useContext(Context);

  // Safe log
  if (user) {
    console.log(user.username);
  } else {
    console.log("No user logged in");
  }

  const navLinks = [
    { name: "Home", url: "/" },
    { name: "Blogs", url: "/blogs" },
    { name: "About", url: "/about" },
    { name: "Write", url: "/write" },
    { name: "Markdown", url: "/markdown" },
  ];

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    onClose();
  };

  return (
    <aside className="sidebar" role="navigation" aria-label="Sidebar menu">
      <nav className="sidebar__menu">
        {navLinks.map((link) => (
          <Link
            to={link.url}
            key={link.name}
            className="sidebar__link"
            onClick={onClose}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <hr className="sidebar__divider" />

      <div className="sidebar__session">
        {user ? (
          <>
            <span>Hi, {user.username?.toUpperCase()}!</span>
            <button className="sidebar__btn" onClick={handleLogout}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="sidebar__btn" onClick={onClose}>
              Sign In
            </Link>
            <Link
              to="/register"
              className="sidebar__btn sidebar__btn--secondary"
              onClick={onClose}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
