import Posts from "../../components/posts/Posts";
import "./Blogs.scss";
import TopView from "../../components/TopView/TopView";

export default function Blogs() {
  return (
    <div className="home">
      <div className="home__content">
        <div className="home__content__posts">
          <Posts />
        </div>
      </div>
      <div className="home__sidebar">
        <TopView />
      </div>
    </div>
  );
}
