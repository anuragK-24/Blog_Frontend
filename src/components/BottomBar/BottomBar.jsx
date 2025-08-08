import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  Info,
  PenSquare,
  Code2,
} from "lucide-react"; // Modern icons
import "./BottomBar.scss";

export default function BottomBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { icon: <Home size={22} />, route: "/" },
    { icon: <BookOpen size={22} />, route: "/blogs" },
    { icon: <PenSquare size={22} />, route: "/write" },
    { icon: <Code2 size={22} />, route: "/markdown" },
    { icon: <Info size={22} />, route: "/about" },
  ];

  return (
    <div className="bottom-bar">
      {items.map((item, idx) => {
        const active = location.pathname === item.route;
        return (
          <div
            className={`bottom-bar__item ${active ? "active" : ""}`}
            key={idx}
            onClick={() => navigate(item.route)}
          >
            {item.icon}
          </div>
        );
      })}
    </div>
  );
}
