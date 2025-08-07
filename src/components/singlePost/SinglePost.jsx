import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { marked } from "marked";
import { CircularProgress, Button } from "@mui/material";
import { Context } from "../../context/Context";
import "./singlePost.css";

export default function SinglePost() {
  const location = useLocation();
  const blog_id = location.pathname.split("/")[2];
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [author, setAuthor] = useState();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasUpdatedView, setHasUpdatedView] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/posts/${blog_id}`,
          {
            params: { userId: user?._id },
          }
        );

        const postData = res.data;
        setPost(postData);
        setTitle(postData.title);
        setDesc(postData.desc);
        setPhoto(postData.photo);
        setAuthor(postData.author);
        setLoading(false);

        if (user._id !== author._id) {
          setHasUpdatedView(true);
        }
      } catch (error) {
        setLoading(false);
      }
    };

    fetchPost();
  }, [blog_id, user, hasUpdatedView]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/posts/${post._id}`,
        {
          data: { userId: user._id },
        }
      );
      navigate("/blogs");
    } catch (err) {
      
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/posts/${post._id}`,
        {
          userId: user._id,
          title,
          desc,
          photo,
        }
      );
      setUpdateMode(false);
      navigate("/blogs");
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

  if (!post) {
    return <div className="error">Post not found.</div>;
  }

  // ✅ Check author permission
  const isAuthor = user && user._id === author._id;
  

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
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {isAuthor && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                />
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                />
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:{" "}
            {author ? (
              <Link to={`/?user=${author.username}`} className="link">
                <b>{author.username.toUpperCase()}</b>
              </Link>
            ) : (
              <b>Unknown</b>
            )}
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
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
              "&:hover": {
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
