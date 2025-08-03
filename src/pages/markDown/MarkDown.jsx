import React from "react";
import CopyText from "../../components/CopyText/CopyText";
import "./MarkDown.scss";

const data = [
  {
    heading: "CODE BLOCK",
    textToCopy: "```\nconst a = 10;\nconsole.log(a);\n```",
  },
  {
    heading: "HEADINGS",
    textToCopy:
      "# H1 Heading\n\n## H2 Heading\n\n### H3 Heading\n\n#### H4 Heading\n\n##### H5 Heading\n\n###### H6 Heading",
  },
  {
    heading: "BOLD & ITALIC",
    textToCopy:
      "**Bold Text**\n\n*Italic Text*\n\n***Bold & Italic Text***",
  },
  {
    heading: "ORDERED LIST",
    textToCopy: "1. First item\n2. Second item\n3. Third item",
  },
  {
    heading: "UNORDERED LIST",
    textToCopy: "- Item 1\n- Item 2\n- Item 3",
  },
  {
    heading: "CHECKLIST",
    textToCopy:
      "- [x] Task 1\n- [ ] Task 2\n- [ ] Task 3",
  },
  {
    heading: "LINK",
    textToCopy: "[OpenAI](https://www.amazon.in)",
  },
  {
    heading: "IMAGE",
    textToCopy: "![Alt Text](https://via.placeholder.com/150)",
  },
  {
    heading: "BLOCKQUOTE",
    textToCopy: "> This is a blockquote.\n> - Author Name",
  },
  {
    heading: "TABLE",
    textToCopy:
      "| Name | Age |\n|------|-----|\n| John | 25  |\n| Jane | 22  |",
  },
  {
    heading: "STRIKETHROUGH",
    textToCopy: "~~This text is strikethrough~~",
  },
];

export default function MarkDown() {
  return (
    <div className="MarkDown">
      <div className="MarkDown__Heading">Markdown</div>
      <hr />
      <div className="MarkDown__Desc">
        Write neat and clean blogs with markdown. Here are some markdown
        snippets:
      </div>
      {data.map((e, key) => (
        <CopyText heading={e.heading} textToCopy={e.textToCopy} key={key} />
      ))}
    </div>
  );
}
