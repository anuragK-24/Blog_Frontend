import { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import loadingIcon from "../../image/loading__snail.gif";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isResolved, setIsResolved] = useState(false);
  const { search } = useLocation();

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
            <img className="home__loading__icon" src={loadingIcon} alt="" />
          </div>
        ) : (
          <Posts posts={posts} />
        )}
      </div>
    </>
  );
}
