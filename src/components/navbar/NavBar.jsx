import React, { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Context } from "../../context/Context";
import Sidebar from "../Sidebar/Sidebar";
import { motion } from "framer-motion";
import "./NavBar.scss";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { user, dispatch } = useContext(Context);

  const headingData = [
    { name: "Home", url: "/" },
    { name: "Blogs", url: "/blogs" },
    { name: "About", url: "/about" },
    { name: "Write", url: "/write" },
    { name: "Markdown", url: "/markdown" },
  ];

  const handleLogout = () => dispatch({ type: "LOGOUT" });

  return (
    <>
      <motion.nav
        className="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button className="hamburger" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>

        <a className="endElement" href="/">
          <span className="brand-gradient">BlogSpark</span>
        </a>

        <ul className="navLinks">
          {headingData.map((item, index) => (
            <li key={index} className="navItem">
              <a href={item.url}>{item.name}</a>
            </li>
          ))}
        </ul>

        {user ? (
          <div className="navbar__user">
            <div className="navbar__toggle">Hi, {user.username.toUpperCase()}!</div>
            <div className="navbar__SignOut" onClick={handleLogout}>Sign Out</div>
          </div>
        ) : (
          <div className="Session">
            <a href="/login" className="Session__link">Sign In</a> /
            <a href="/register" className="Session__link">Sign Up</a>
          </div>
        )}
      </motion.nav>

      {open && <Sidebar onClose={() => setOpen(false)} />}
    </>
  );
};

export default NavBar;
