import React, { useContext } from "react";
import "./Sidebar.scss";
import { Context } from "../../context/Context";

function Sidebar() {
  const { user, dispatch } = useContext(Context);
  const headingData = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Write", url: "/write" },
    { name: "Markdown", url: "/markdown" },
  ];

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="Sidebar active">
      <div className="Sidebar__Data">
        {headingData.map((item, key) => (
          <a key={key} href={item.url}>
            {item.name}
          </a>
        ))}
      </div>

      {/* Divider between the main navigation and the sign-in/sign-out section */}
      <div className="Sidebar__Divider"></div>

      <div>
        {user ? (
          <div className="Sidebar__SignOut" onClick={handleLogout}>
            SignOut
          </div>
        ) : (
          <>
            <a href="/login">SignIn</a>
            <a href="/register">SignUp</a>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
