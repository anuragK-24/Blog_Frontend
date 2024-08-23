import React, { useState, useEffect } from "react";
import "./posts.css";
import Post from "../post/Post";
import axios from "axios";
import loadingIcon from "../../image/loading__snail.gif";
import "../../pages/home/home.scss";
export default function Posts() {
  const [isResolved, setIsResolved] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (page) => {
    try {
      const res = await axios.get(
        `https://blog-backend-zeta.vercel.app/api/posts?page=${page}&limit=3`
      );
      setPosts((prevPosts) => {
        const newPosts = res.data.posts.filter(
          (newPost) => !prevPosts.some((post) => post._id === newPost._id)
        );
        return [...prevPosts, ...newPosts];
      });
      setIsResolved(true);
      setHasMore(res.data.hasMore);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

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
          {posts.map((p, key) => (
            <Post post={p} key={key} />
          ))}
          {hasMore && (
            <button
              className="postsButton"
              onClick={() => setPage((prevPage) => prevPage + 1)}
            >
              Load More
            </button>
          )}
        </div>
      )}
    </>
  );
}
