import React from "react";
import CopyText from "../../components/CopyText/CopyText";
import "./MarkDown.scss";
const data = [
  {
    heading: "CODE",
    textToCopy: "```\n Insert code here \n```",
  },
  {
    heading: "HEADING",
    textToCopy:
      "# text -> for Largest size word \n\n## text -> for next Largest size word\n\n### text -> for next  smaller size word",
  },
  {
    heading: "INSERT IMAGE",
    textToCopy: `![](Insert here image URL)`,
  },
  { heading: "BOLD TEXT", textToCopy: `**Text**  ->  without any space` },
];
export default function MarkDown() {
  return (
    <div className="MarkDown">
      <div className="MarkDown__Heading"> Markdown </div>
      <hr />
      <div className="MarkDown__Desc">
        Write neat and clean blogs with markdown. Here are some markdown 
      </div>
      {data.map((e, key) => {
        return (
          <CopyText heading={e.heading} textToCopy={e.textToCopy} key={key} />
        );
      })}
    </div>
  );
}
