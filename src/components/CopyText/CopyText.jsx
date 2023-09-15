import React from "react";
import "./CopyText.scss";
import copy from "../../image/copy.png";
const CopyText = ({ textToCopy,heading }) => {
  const handleCopyClick = () => {
    const el = document.createElement("textarea");
    el.value = textToCopy;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  return (<>
    <h2 className="CopyText__Heading">{heading}</h2>
    <div className="CopyText">
    <img
      className="CopyText__Title"
      onClick={handleCopyClick}
      src={copy}
      alt=""
    />
    <hr />
    <div className="CopyText__Code" role="button" tabindex="0">
      {textToCopy}
    </div>
  </div>
</>  );
};

export default CopyText;
