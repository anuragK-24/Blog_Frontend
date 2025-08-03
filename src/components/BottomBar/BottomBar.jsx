import React, { useContext } from "react";
import {
  FaHome,
  FaBook,
  FaInfoCircle,
  FaPen,
  FaCode,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import "./BottomBar.scss";

export default function BottomBar() {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(Context);
  const isLoggedIn = !!user;

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const items = [
    { label: "Home", icon: <FaHome />, route: "/" },
    { label: "Blogs", icon: <FaBook />, route: "/blogs" },
    { label: "About", icon: <FaInfoCircle />, route: "/about" },
    { label: "Write", icon: <FaPen />, route: "/write" },
    { label: "Markdown", icon: <FaCode />, route: "/markdown" },
    {
      label: isLoggedIn ? "Sign Out" : "Sign In",
      icon: isLoggedIn ? <FaSignOutAlt /> : <FaSignInAlt />,
      route: isLoggedIn ? "/logout" : "/login",
      onClick: isLoggedIn ? handleLogout : () => navigate("/login"),
    },
  ];

  return (
    <div className="bottom-bar">
      {items.map((item, idx) => (
        <div
          className="bottom-bar__item"
          key={idx}
          onClick={() => {
            if (item.onClick) {
              item.onClick();
            } else {
              navigate(item.route);
            }
          }}
        >
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
