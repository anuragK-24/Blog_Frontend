import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleClick = () => {
    setMenuOpen(!menuOpen);
  }

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
 
  return (
    <div className={`top ${menuOpen ? "Active" : ""}`}>
      <div
          className={`hamburger ${menuOpen ? "Active" : ""}`}
          onClick={handleClick}
        >
          <div  className={`hamburger__line ${menuOpen ? "Active" : ""}`}></div>
          <div  className={`hamburger__line ${menuOpen ? "Active" : ""}`}></div>
          <div  className={`hamburger__line ${menuOpen ? "Active" : ""}`}></div>
        </div>
      <div className="topLeft">
        <a href="">
          <i className="topIcon fa-brands fa-facebook"></i>
        </a>
        <i className="topIcon fa-brands fa-instagram"></i>
        <a href="">
          <i className="topIcon fa-brands fa-twitter"></i>
        </a>
        <i className="topIcon fa-brands fa-pinterest"></i>
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
          <li  className="topListItem" onClick={handleLogout}>
            {user && "Logout"}
          </li>
        </ul>
      </div>
      <div className={`topRight ${menuOpen ? "Active" : ""}`}>
        {user ? (
          <Link to="/settings">
            {" "}
            <img className="topImage" src={user.profilePic} alt="" />{" "}
          </Link>
        ) : (
          <ul className="topList">
            <li onClick={handleClick} className="topListItem">
              <Link className="link" to="/login">
                Login
              </Link>
            </li>
            <li onClick={handleClick} className="topListItem">
              <Link className="link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
