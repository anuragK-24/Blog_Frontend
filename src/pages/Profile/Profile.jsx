import React, { useContext, useEffect, useState } from "react";
import "./Profile.scss";
import { Context } from "../../context/Context";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Github,
  Linkedin,
  Globe,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

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
            github: user?.github || "",
            linkedin: user?.linkedin || "",
            website: user?.website || "",
            twitter: user?.twitter || "",
            instagram: user?.instagram || "",
            youtube: user?.youtube || "",
          });
        } else {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/users/${userId}`
          );
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
      github: formData.github.trim(),
      linkedin: formData.linkedin.trim(),
      website: formData.website.trim(),
      twitter: formData.twitter.trim(),
      instagram: formData.instagram.trim(),
      youtube: formData.youtube.trim(),
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
      setProfileData(res.data);
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
      github: user?.github || "",
      linkedin: user?.linkedin || "",
      website: user?.website || "",
      twitter: user?.twitter || "",
      instagram: user?.instagram || "",
      youtube: user?.youtube || "",
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
            <img
              className="profile-photo-preview"
              src={formData.photo}
              alt="Profile"
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

            <label>GitHub URL</label>
            <input
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/yourusername"
            />

            <label>LinkedIn URL</label>
            <input
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/yourprofile"
            />

            <label>Website URL</label>
            <input
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://yourwebsite.com"
            />

            <label>Twitter URL</label>
            <input
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              placeholder="https://twitter.com/yourhandle"
            />

            <label>Instagram URL</label>
            <input
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/yourhandle"
            />

            <label>YouTube URL</label>
            <input
              name="youtube"
              value={formData.youtube}
              onChange={handleChange}
              placeholder="https://youtube.com/yourchannel"
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
      ) : (
        <div className="profile-view">
          {profileData.photo ? (
            <img
              className="profile-photo"
              src={profileData.photo}
              alt="Profile"
            />
          ) : (
            <div className="profile-icon">
              <FaUserCircle />
            </div>
          )}
          <h2>{profileData.username}</h2>
          {/* Show social icons if available */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "1rem",
            }}
          >
            {profileData.github && (
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                style={{ color: "#333", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#4078c0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
              >
                <Github size={28} />
              </a>
            )}

            {profileData.linkedin && (
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{ color: "#333", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0077b5")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
              >
                <Linkedin size={28} />
              </a>
            )}

            {profileData.website && (
              <a
                href={profileData.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                style={{ color: "#333", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0066ff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
              >
                <Globe size={28} />
              </a>
            )}

            {profileData.twitter && (
              <a
                href={profileData.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                style={{ color: "#333", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1da1f2")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
              >
                <Twitter size={28} />
              </a>
            )}

            {profileData.instagram && (
              <a
                href={profileData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: "#333", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#e1306c")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
              >
                <Instagram size={28} />
              </a>
            )}

            {profileData.youtube && (
              <a
                href={profileData.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                style={{ color: "#333", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ff0000")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
              >
                <Youtube size={28} />
              </a>
            )}
          </div>
          <p>{profileData.about}</p>
          {Array.isArray(profileData.techSkills) && (
            <p>
              <strong>Skills:</strong> {profileData.techSkills.join(", ")}
            </p>
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
