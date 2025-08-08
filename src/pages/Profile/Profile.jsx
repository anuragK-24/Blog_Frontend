import React, { useContext, useEffect, useState } from "react";
import "./Profile.scss";
import { Context } from "../../context/Context";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const token = localStorage.getItem("token");
  const { user, dispatch } = useContext(Context);
  const { userId } = useParams(); // userId from URL if visiting someone else's profile

  const isOwnProfile = !userId || userId === user?._id;

  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (isOwnProfile) {
          setProfileData(user);
          setFormData({
            username: user?.username || "",
            techSkills: Array.isArray(user?.techSkills)
              ? user.techSkills.join(", ")
              : user?.techSkills || "",
            photo: user?.photo || "",
            about: user?.about || "",
          });
        } else {
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userId}`);
          setProfileData(res.data);
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    loadProfile();
  }, [userId, user, isOwnProfile]);

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
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage({ type: "success", text: "Profile updated successfully!" });
      setIsEditing(false);
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

  if (!profileData) return <div className="profile">Loading...</div>;

  return (
    <div className="profile">
      {isOwnProfile && isEditing ? (
        <div className="profile-edit">
          <h2>Edit Profile</h2>
          {formData.photo ? (
            <img className="profile-photo-preview" src={formData.photo} alt="Profile" />
          ) : (
            <div className="profile-icon"><FaUserCircle /></div>
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
              placeholder="e.g., React, Node.js"
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
              rows={4}
              placeholder="Tell us about yourself..."
            />

            {message.text && (
              <p className={message.type === "error" ? "error" : "success"}>{message.text}</p>
            )}

            <div className="button-container">
              <button type="submit">Update</button>
              <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="profile-view">
          {profileData.photo ? (
            <img className="profile-photo" src={profileData.photo} alt="Profile" />
          ) : (
            <div className="profile-icon"><FaUserCircle /></div>
          )}
          <h2>{profileData.username}</h2>
          <p>{profileData.about}</p>
          {Array.isArray(profileData.techSkills) && (
            <p><strong>Skills:</strong> {profileData.techSkills.join(", ")}</p>
          )}

          {isOwnProfile && (
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
