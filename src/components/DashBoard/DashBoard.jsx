// DashBoard.js
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./DashBoard.scss";
import { Context } from "../../context/Context";

const DashBoard = () => {
  const { user } = useContext(Context);
  const userId = user._id;
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/users/${userId}/stats`
        );
        setStats(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchStats();
  }, [userId]);

  return (
    <div className="dashboard">
      <h2>Your Blog Stats</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : stats.length === 0 ? (
        <p>You haven’t written any blogs yet.</p>
      ) : (
        <div className="dashboard__grid">
          {stats.map((post) => (
            <div className="dashboard__card" key={post._id}>
              <h3 className="dashboard__title">{post.title}</h3>
              <p className="dashboard__date">
                Published on: {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="dashboard__views">Views: {post.views || 0}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashBoard;
