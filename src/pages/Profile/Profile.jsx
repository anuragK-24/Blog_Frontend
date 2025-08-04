import React, { useContext, useState } from "react";
import "./Profile.scss";
import { Context } from "../../context/Context";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import DashBoard from "../../components/DashBoard/DashBoard";

const Profile = () => {
  const { user, dispatch } = useContext(Context);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    techSkills: Array.isArray(user?.techSkills)
      ? user.techSkills.join(", ")
      : user?.techSkills || "",
    photo: user?.photo || "",
    about: user?.about || "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      userId: user._id,
      username: formData.username.trim(),
      techSkills: formData.techSkills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== ""),
      photo: formData.photo.trim(),
      about: formData.about.trim(),
    };

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/users/${user._id}`,
        updatedData
      );

      setMessage({ type: "success", text: "Profile updated successfully!" });
      setIsEditing(false);

      // Update context with new user data
      dispatch({ type: "UPDATE_USER", payload: res.data });
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err.response?.data || "Failed to update profile.",
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user?.username || "",
      techSkills: Array.isArray(user?.techSkills)
        ? user.techSkills.join(", ")
        : user?.techSkills || "",
      photo: user?.photo || "",
      about: user?.about || "",
    });
    setMessage({ type: "", text: "" });
    setIsEditing(false);
  };

  return (
    <div className="profile">
      {!isEditing ? (
        <div className="profile-view">
          {user?.photo ? (
            <img className="profile-photo" src={user.photo} alt="Profile" />
          ) : (
            <div className="profile-icon">
              <FaUserCircle />
            </div>
          )}
          <h2>{user?.username}</h2>
          <p>{user?.about}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <div className="profile-edit">
          <h2>Edit Profile</h2>
          {formData.photo ? (
            <img
              className="profile-photo-preview"
              src={formData.photo}
              alt="Profile Preview"
            />
          ) : (
            <div className="profile-icon">
              <FaUserCircle />
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />

            <label>Tech Skills (comma-separated)</label>
            <input
              name="techSkills"
              value={formData.techSkills}
              onChange={handleChange}
              placeholder="e.g., React, Node.js, AWS"
            />

            <label>Photo URL (optional)</label>
            <input
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              placeholder="https://..."
            />

            <label>About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              rows={4}
            />

            {message.text && (
              <p className={message.type === "error" ? "error" : "success"}>
                {message.text}
              </p>
            )}

            <div className="button-container">
              <button type="submit">Update</button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <DashBoard />
    </div>
  );
};

export default Profile;
