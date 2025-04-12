import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";

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
      username: user.username,
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
      <Card className="write-card" elevation={3}>
        <CardContent>
          <Typography variant="h4" className="write-heading" gutterBottom>
            Create a New Blog Post
          </Typography>

          {photo && (
            <img className="write-img-preview" src={photo} alt="Preview" />
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

            <Typography className="note-text">
              Note: Use Markdown for beautiful formatting. Visit the markdown
              help page before writing.
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
              <Button variant="contained" color="primary" type="submit">
                Publish
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
