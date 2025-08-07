import React, { useContext } from "react";
import Posts from "../../components/posts/Posts";
import "./Blogs.scss";
import { Context } from "../../context/Context";

export default function Blogs() {
  const { user } = useContext(Context);

  return (
    <div className="home">
      <div className="home__content">
        {user?.username ? (
          <h2 className="greeting">
            Welcome <b><i>{user.username.toUpperCase()}</i></b>
          </h2>
        ) : (
          <h2 className="greeting">Welcome, Guest!</h2>
        )}
        <div className="home__content__posts">
          <Posts user={user} />
        </div>
      </div>
    </div>
  );
}
