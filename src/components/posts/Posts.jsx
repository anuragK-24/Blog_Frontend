import React, { useState, useEffect, useRef, useCallback } from "react";
import "./posts.css";
import Post from "../post/Post";
import axios from "axios";
import loadingIcon from "../../image/loading__snail.gif";
import "../../pages/home/home.scss";
import EndMsg from "../EndMsg/EndMsg";

export default function Posts() {
  const [isResolved, setIsResolved] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null); // Reference for Intersection Observer

  const fetchPosts = async (page) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/posts?page=${page}&limit=3`
      );
      if (Array.isArray(res.data.posts)) {
        setPosts((prevPosts) => {
          const newPosts = res.data.posts.filter(
            (newPost) => !prevPosts.some((post) => post._id === newPost._id)
          );
          return [...prevPosts, ...newPosts];
        });
        setIsResolved(true);
        setHasMore(res.data.hasMore);
      } else {
        console.error("Invalid posts data format:", res.data.posts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  // Intersection Observer Callback
  const lastPostRef = useCallback(
    (node) => {
      if (!hasMore || !node) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        { rootMargin: "100px", threshold: 1.0 } // Trigger when fully in view
      );

      observerRef.current.observe(node);
    },
    [hasMore]
  );

  return (
    <>
      {!isResolved ? (
        <div className="home__loading">
          <h2 className="home__loading__text">
            Fetching API at startup, please wait. Thanks for your patience!
          </h2>
          <img className="home__loading__icon" src={loadingIcon} alt="" />
        </div>
      ) : (
        <div className="posts">
          {posts.length === 0 && <h1 className="text">No Blog found</h1>}
          {posts.map((p, index) => (
            <div
              ref={index === posts.length - 1 ? lastPostRef : null}
              key={p._id}
            >
              <Post
                post={p}
                classN={
                  new Date(p.createdAt).toDateString() ===
                  new Date().toDateString()
                    ? "firstPost"
                    : ""
                }
              />
            </div>
          ))}
        </div>
      )}
      {!hasMore && posts.length > 0 && (
        <EndMsg/>
      )}
    </>
  );
}
