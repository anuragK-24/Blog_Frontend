import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogIn,
  Menu,
  X,
  UserCircle,
  PenSquare,
  BarChart2,
  User,
  LogOut,
} from "lucide-react"; // Modern icons
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.scss";
import { Context } from "../../context/Context";
import Sidebar from "../Sidebar/Sidebar";

const NavBar = () => {
  const { user, dispatch } = useContext(Context);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        {/* Left: Brand + Sidebar toggle */}
        <div className="navbar__left" onClick={() => navigate("/")}>
          <button
            className="hamburger"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
          <span className="brand-gradient">BlogSpark</span>
        </div>

        {/* Center: Search */}
        <div className="navbar__center">
          <SearchBar />
        </div>

        {/* Right: User menu */}
        <div className="navbar__right" ref={dropdownRef}>
          {user ? (
            <>
              {user.photo ? (
                <img
                  src={user.photo}
                  alt="user"
                  className="navbar__avatar"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "";
                  }}
                />
              ) : (
                <UserCircle
                  size={26}
                  className="navbar__icon-avatar"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
              )}
              {dropdownOpen && (
                <div className="navbar__dropdown">
                  <div onClick={() => { navigate("/profile"); setDropdownOpen(false); }}>
                    <User size={18} /> Profile
                  </div>
                  <div onClick={() => { navigate("/write"); setDropdownOpen(false); }}>
                    <PenSquare size={18} /> Write
                  </div>
                  <div onClick={() => { navigate("/stats"); setDropdownOpen(false); }}>
                    <BarChart2 size={18} /> Stats
                  </div>
                  <div onClick={handleLogout}>
                    <LogOut size={18} /> Logout
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <LogIn
                size={22}
                className="navbar__loginIcon"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="navbar__dropdown">
                  <div onClick={() => { navigate("/login"); setDropdownOpen(false); }}>
                    <LogIn size={18} /> Login
                  </div>
                  <div onClick={() => { navigate("/register"); setDropdownOpen(false); }}>
                    <User size={18} /> Sign Up
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </nav>
      {open && <Sidebar onClose={() => setOpen(false)} />}
    </>
  );
};

export default NavBar;
