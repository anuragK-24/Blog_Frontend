import "./header.css";
import homeImage from "../../image/home.jpg";
export default function Header() {
  return (
    <>
      <div className="header">
        <div className="headerTitles">
          <span className="headerTitleSm">React & Node</span>
          <span className="headerTitleLg">BlogSpark</span>
        </div>
        <div className="headerImg"></div>
      </div>
    </>
  );
}
