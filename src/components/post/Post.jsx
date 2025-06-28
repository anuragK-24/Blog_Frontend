import "./post.scss";
import { Link } from "react-router-dom";
import { marked } from "marked";

export default function Post({ post, classN }) {
  const normalizeName = (text) => text.replace(/anurag/gi, "Anurag");

  return (
    <Link to={`/post/${post._id}`} className="link">
      {classN === "firstPost" && <div className="latestLabel">Latest</div>}
      <div className={`post ${classN}`}>
        <div className="post_Content">
          <div className="post_Content_Author">
            Author: {normalizeName(post.username)}
          </div>
          <h2 className="post_Content_Title">{post.title}</h2>
          <div className="post_Content_Info_Date">
            {new Date(post.createdAt).toDateString()}
          </div>
          <div
            className="post_Content_Desc"
            dangerouslySetInnerHTML={{ __html: marked(post.desc) }}
          />
        </div>
        {post.photo && (
          <img className="post_Img" src={post.photo} alt="Blog Thumbnail" />
        )}
      </div>
    </Link>
  );
}
