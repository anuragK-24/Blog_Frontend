import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ImagePlus } from "lucide-react"; // modern icon

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState(
    "https://revenuearchitects.com/wp-content/uploads/2017/02/Blog_pic-450x255.png"
  );
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      title,
      desc,
      photo,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/posts`,
        newPost
      );
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.error("Failed to publish post:", err);
    }
  };

  return (
    <div className="write-container">
      <Card className="write-card" elevation={4}>
        <CardContent>
          <Typography variant="h4" className="write-heading" gutterBottom>
            ✏️ Create a New Blog Post
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {photo && (
            <div className="write-img-container">
              <img className="write-img-preview" src={photo} alt="Preview" />
            </div>
          )}

          <form className="write-form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Image URL"
              variant="outlined"
              size="small"
              margin="normal"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              InputProps={{
                startAdornment: <ImagePlus size={18} style={{ marginRight: 8 }} />,
              }}
            />

            <TextField
              fullWidth
              label="Blog Title"
              variant="outlined"
              margin="normal"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Typography
              className="note-text"
              sx={{ fontSize: 12, color: "gray", mt: 0.5 }}
            >
              💡 Tip: Use <Link to="/markdown">Markdown</Link> for formatting
              (e.g. <code>**bold**</code>, <code>_italic_</code>,{" "}
              <code># heading</code>).
            </Typography>

            <TextField
              fullWidth
              label="Your Story"
              variant="outlined"
              multiline
              rows={12}
              margin="normal"
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <div className="submit-btn-container">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  px: 4,
                  py: 1.2,
                }}
              >
                🚀 Publish Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
