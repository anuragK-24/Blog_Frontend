import React, { useContext } from "react";
import {
  FaHome,
  FaBook,
  FaInfoCircle,
  FaPen,
  FaCode,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./BottomBar.scss";

export default function BottomBar() {
  const navigate = useNavigate();


  const items = [
    { label: "Home", icon: <FaHome />, route: "/" },
    { label: "Blogs", icon: <FaBook />, route: "/blogs" },
    { label: "About", icon: <FaInfoCircle />, route: "/about" },
    { label: "Write", icon: <FaPen />, route: "/write" },
    { label: "Markdown", icon: <FaCode />, route: "/markdown" },
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
