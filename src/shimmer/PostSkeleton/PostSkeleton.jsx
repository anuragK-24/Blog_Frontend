// PostSkeleton.jsx
import "./PostSkeleton.scss";

export default function PostSkeleton() {
  return (
    <div className={`PostSkeleton`}>
      <div className="PostSkeleton_Content">
        <div className="PostSkeleton_Content_Author skeleton-box" />
        <h2 className="PostSkeleton_Content_Title skeleton-box" />
        <div className="PostSkeleton_Content_Info_Date skeleton-box" />
        <div className="PostSkeleton_Content_Desc skeleton-box" />
      </div>
      <div className="PostSkeleton_Img skeleton-box" />
    </div>
  );
}
