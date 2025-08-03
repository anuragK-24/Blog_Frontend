import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { marked } from "marked";
import "./singlePost.css";
import { Button, CircularProgress } from "@mui/material";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasUpdatedView, setHasUpdatedView] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts/${path}`);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setPhoto(res.data.photo);
        setLoading(false);

        // Update view count only if user is NOT the author and view hasn't been updated yet
        if (!hasUpdatedView && (!user || res.data.username !== user.username)) {
          await axios.put(`${process.env.REACT_APP_API_URL}/api/posts/${path}/view`);
          setHasUpdatedView(true);
        }
      } catch (error) {
        console.error("Failed to fetch post:", error);
        setLoading(false);
      }
    };

    getPost();
  }, [path, user, hasUpdatedView]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
        photo,
      });
      setUpdateMode(false);
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  if (loading) {
    return (
      <div className="loaderWrapper">
        <CircularProgress size={50} />
      </div>
    );
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {updateMode ? (
          <input
            type="text"
            value={photo}
            className="singlePostTitleInput"
            autoFocus
            placeholder="Image URL"
            onChange={(e) => setPhoto(e.target.value)}
          />
        ) : (
          photo && <img src={photo} alt="Post" className="singlePostImg" />
        )}

        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)} />
                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete} />
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username?.toUpperCase()}</b>
            </Link>
          </span>
          <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
          <span className="singlePostViews">👁️ {post.views || 0} views</span>
        </div>

        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            rows="20"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <div
            className="singlePostDesc"
            dangerouslySetInnerHTML={{ __html: marked.parse(desc) }}
          />
        )}

        {updateMode && (
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              backgroundColor: "#6a1b9a",
              mt: 2,
              alignSelf: "flex-end",
              '&:hover': {
                backgroundColor: "#4a148c",
              },
            }}
          >
            Update
          </Button>
        )}
      </div>
    </div>
  );
}
