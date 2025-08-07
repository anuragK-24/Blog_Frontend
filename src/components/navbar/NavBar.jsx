import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSignInAlt,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaPen,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
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

  // Close dropdown when clicking outside
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
        <div className="navbar__left" onClick={() => navigate("/")}>
          <button
            className="hamburger"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
          <span className="brand-gradient">BlogSpark</span>
        </div>

        <div className="navbar__center">
          <SearchBar />
        </div>

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
                <FaUserCircle
                  className="navbar__icon-avatar"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
              )}
              {dropdownOpen && (
                <div className="navbar__dropdown">
                  <div onClick={() => { navigate("/profile"); setDropdownOpen(false); }}>
                    <FaUser /> Profile
                  </div>
                  <div onClick={() => { navigate("/write"); setDropdownOpen(false); }}>
                    <FaPen /> Write
                  </div>
                  <div onClick={() => { navigate("/stats"); setDropdownOpen(false); }}>
                    <FaChartBar /> Stats
                  </div>
                  <div onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <FaSignInAlt
                className="navbar__loginIcon"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="navbar__dropdown">
                  <div onClick={() => { navigate("/login"); setDropdownOpen(false); }}>
                    <FaSignInAlt /> Login
                  </div>
                  <div onClick={() => { navigate("/register"); setDropdownOpen(false); }}>
                    <FaUser /> Sign Up
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
