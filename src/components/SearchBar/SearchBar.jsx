import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SearchBar.scss";

export default function SearchBar() {
  const navigate = useNavigate();
  const [searchPost, setSearchPost] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState("");
  const searchContainerRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = async (searchQuery) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/posts/search/${searchQuery}`
      );
      setSearchPost(res.data);
      setError("");
    } catch (error) {
      setError("Failed to fetch posts. Please try again later.");
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    if (debouncedSearchInput) {
      fetchPosts(debouncedSearchInput);
    }
  }, [debouncedSearchInput]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="searchBar__container" ref={searchContainerRef}>
      <div
        className="searchBar__inputWrapper"
        onFocus={() => setIsFocused(true)}
      >
        <input
          className="searchBar__input"
          placeholder="Search blogs..."
          type="text"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          onFocus={() => setIsFocused(true)}
        />
        {searchInput && (
          <i
            className="searchBar__clearIcon fa-solid fa-xmark"
            onClick={() => {
              setSearchInput("");
              setSearchPost([]);
            }}
          ></i>
        )}
        <Link to={`/?user=${searchInput}`} className="link">
          <i
            className={`searchBar__icon fa-solid fa-magnifying-glass ${
              searchInput.length > 0 ? "active shake" : ""
            }`}
          ></i>
        </Link>
      </div>

      {isFocused && (
        <div className="searchBar__results">
          {searchInput.length !== 0 && searchPost.length !== 0 ? (
            <>
              {searchPost.map((post) => (
                <li
                  key={post._id}
                  onClick={() => navigate(`post/${post._id}`)}
                  className="searchBar__item"
                >
                  {post.title}
                </li>
              ))}
              <div className="searchBar__info">
                Top Search results: {searchPost.length}
              </div>
            </>
          ) : searchInput.length !== 0 ? (
            <div className="searchBar__info">No blog post found</div>
          ) : (
            <div className="searchBar__info">Find your favourite blog post</div>
          )}
        </div>
      )}

      {error && <div className="searchBar__error">{error}</div>}
    </div>
  );
}
