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
  const inputRef = useRef(null);
  const [placeholderText, setPlaceholderText] = useState(
    "Search for blogs (Ctrl + K)"
  );

  useEffect(() => {
    const updatePlaceholder = () => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (isMobile) {
        setPlaceholderText("Search...");
      } else {
        setPlaceholderText("Search for blogs (Ctrl + K)");
      }
    };

    updatePlaceholder(); // set on load
    window.addEventListener("resize", updatePlaceholder);

    return () => window.removeEventListener("resize", updatePlaceholder);
  }, []);

  // 2️⃣ Inside useEffect, add a listener for Ctrl+K
  useEffect(() => {
    const handleShortcut = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault(); // Prevent browser's default "search in page"
        inputRef.current?.focus();
        setIsFocused(true);
      }
    };

    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

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
          ref={inputRef}
          className="searchBar__input"
          placeholder={placeholderText}
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
