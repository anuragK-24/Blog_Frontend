import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import "./home.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import loadingIcon from "../../image/loading__snail.gif";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Home() {
  const { user } = useContext(Context);

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isResolved, setIsResolved] = useState(false);
  const { search } = useLocation();
  const [userPost, setUserPost] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "https://blogapi-gpp7.onrender.com/api/posts" + search
      );
      setIsResolved(true);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />

      <div className="home">
        {!isResolved ? (
          <div className="home__loading">
            <h2 className="home__loading__text">Fetching API at startup, please wait. Thanks for your patience!</h2>
            <img className="home__loading__icon" src={loadingIcon} alt="" />
          </div>
        ) : (
          <div className="home__content">
            {user ? (
              <h3 className="greeting">
                Welcome{" "}
                <b>
                  {" "}
                  <i>{user.username.toUpperCase()}</i>{" "}
                </b>{" "}
              </h3>
            ) : (
              ""
            )}
            <div className="home__content__search">
              <input
                className="home__content__search__input"
                placeholder="Search Blogs' by Author's name"
                type="text"
                onChange={(e) => {
                  setUserPost(e.target.value.toLowerCase());
                  const filteredPosts = posts.filter((post) => {
                    return post.username
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase());
                  });
                  setPosts(filteredPosts);

                  if (e.target.value.length > 0) {
                    navigate(`/?user=${e.target.value.toLowerCase()}`);
                  }
                  if (e.target.value.length === 0) {
                    navigate(`/`);
                  }
                }}
              />
              <Link to={`/?user=${userPost}`} className="link">
                <i
                  className={`topSearchIcon fa-solid fa-magnifying-glass ${
                    userPost.length > 0 ? "active" : ""
                  } ${userPost.length > 0 ? "shake" : ""}`}
                ></i>
              </Link>
            </div>

            <div className="home__content__posts">
              {posts.length !== 0 ? (
                <h3 className="text">
                  {" "}
                  Total {userPost}  Blogs : {posts.length}
                </h3>
              ) : (
                ""
              )}
              <Posts posts={posts} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
