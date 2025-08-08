import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./TopView.scss";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";

export default function TopView() {
  const [post, setPost] = useState(null);
  const { user } = useContext(Context);
  const username = user?.username;

  useEffect(() => {
    axios
      .get("api/posts/top")
      .then((res) => setPost(res.data))
      .catch((err) => console.error("Error fetching top view:", err));
  }, []);

  if (!post) return null;

  return (
    <div className="top-view">
      {post ? (
          <>
          <h3>👋 Welcome {user ? username : "Guest"} !</h3>
          <h3>🔥 Most Famous Blog</h3>

          <Link to={`/post/${post.postId}`}>
            <div className="top-card">
              <img src={post.postPhoto} alt={post.postName} />
              <div className="top-details">
                <h4>{post.postName}</h4>
                <p>
                  by <span>{post.authorName}</span>
                </p>
              </div>
            </div>
          </Link>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
