import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.scss";
import { Context } from "../../context/Context";
import Sidebar from "../Sidebar/Sidebar";

const NavBar = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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

        <div className="navbar__right">
          {user ? (
            user.photo ? (
              <img
                src={user.photo}
                alt="user"
                className="navbar__avatar"
                onClick={() => navigate("/profile")}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = ""; // fallback to icon by removing the image
                }}
              />
            ) : (
              <FaUserCircle
                className="navbar__icon-avatar"
                onClick={() => navigate("/profile")}
              />
            )
          ) : (
            <FaSignInAlt
              className="navbar__loginIcon"
              onClick={() => navigate("/login")}
            />
          )}
        </div>
      </nav>
      {open && <Sidebar onClose={() => setOpen(false)} />}
    </>
  );
};

export default NavBar;
