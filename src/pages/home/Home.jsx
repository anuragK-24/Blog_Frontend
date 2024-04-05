import React from "react";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import "./home.scss";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import loadingIcon from "../../image/loading__snail.gif";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Home() {
  const [isFocused, setIsFocused] = useState(false);
  const { user } = useContext(Context);
  const searchRef = useRef(null);
  const searchItemsRef = useRef(null);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isResolved, setIsResolved] = useState(false);
  const { search } = useLocation();
  const [searchPost, setSearchPost] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "https://blog-backend-zeta.vercel.app/api/posts" + search
      );
      setIsResolved(true);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  console.log("This is search blogs", searchPost);
  return (
    <>
      <Header />

      <div className="home">
        {!isResolved ? (
          <div className="home__loading">
            <h2 className="home__loading__text">
              Fetching API at startup, please wait. Thanks for your patience!
            </h2>
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
            <div
              className="home__content__search"
              style={{
                borderBottomLeftRadius: isFocused ? "0px" : "10px",
                borderBottomRightRadius: isFocused ? "0px" : "10px",
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={(e) => {
                if (
                  !searchRef.current.contains(e.relatedTarget) &&
                  !searchItemsRef.current.contains(e.relatedTarget)
                ) {
                  setIsFocused(false);
                }
              }}
            >
              <input
                className="home__content__search__input"
                placeholder="Search Blogs"
                type="text"
                onChange={(e) => {
                  setInput(e.target.value);
                  setSearchPost(e.target.value.toLowerCase());
                  const filteredPosts = posts.filter((post) => {
                    return post.title
                      .toLowerCase()
                      .startsWith(e.target.value.toLowerCase());
                  });

                  setSearchPost(filteredPosts);
                }}
              />
              <Link to={`/?user=${searchPost}`} className="link">
                <i
                  className={`topSearchIcon fa-solid fa-magnifying-glass ${
                    searchPost.length > 0 ? "active" : ""
                  } ${searchPost.length > 0 ? "shake" : ""}`}
                ></i>
              </Link>
            </div>
            {/* {isFocused && searchPost.length !== 0 ? (
              <div className="home__content__searchItems">
                {input.length !== 0 &&
                  searchPost.map((post) => (
                    <li
                      onClick={() => navigate(`post/${post._id}`)}
                      key={post._id}
                    >
                      {post.title}
                    </li>
                  ))}
                {input.length !== 0 ? (
                  <div>Search result : {searchPost.length}</div>
                ) : (
                  <div>Find your favourite blog</div>
                )}
              </div>
            ) : null}{" "} */}
            {isFocused && searchPost.length !== 0 && (
              <div className="home__content__searchItems" ref={searchItemsRef}>
                {input.length !== 0 &&
                  searchPost.map((post) => (
                    <li
                      onClick={() =>{navigate(`post/${post._id}`)}}
                      key={post._id}
                    >
                      {post.title}
                    </li>
                  ))}
                {input.length !== 0 ? (
                  <div>Search result : {searchPost.length}</div>
                ) : (
                  <div>Find your favourite blog post</div>
                )}
              </div>
            )}
            <div className="home__content__posts">
              <Posts posts={posts} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
