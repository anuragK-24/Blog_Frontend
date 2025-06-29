import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";
import SearchBar from "../SearchBar/SearchBar";
import { motion } from "framer-motion";
import "./NavBar.scss";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.nav className="navbar">
        <div className="navbar__left">
          <button className="hamburger" onClick={() => setOpen(!open)}>
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="navbar__center">
          <SearchBar />
        </div>

        <div className="navbar__right">
          <a className="brand-gradient" href="/">
            BlogSpark
          </a>
        </div>
      </motion.nav>

      {open && <Sidebar onClose={() => setOpen(false)} />}
    </>
  );
};

export default NavBar;
