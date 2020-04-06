import React from "react";
import VerticalTimeline from "../../generic/vertical-timeline";
import CodeIcon from "@material-ui/icons/Code";
import content from "./content";

const contentStyle = {
  background: "white",
  color: "#303e49"
};
const iconStyle = {
  background: "#ea5a4f",
  color: "#fff"
};

export default function ProjectTimeline() {
  return (
    <div>
      <h1 className="text-center">Projects</h1>
      <h5 className="text-center mb-4">
        View on&nbsp;
        <a
          style={{ textDecoration: "underline" }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/alec-ng/"
        >
          GitHub
        </a>
      </h5>
      <VerticalTimeline
        contentStyle={contentStyle}
        iconStyle={iconStyle}
        icon={<CodeIcon />}
        content={content}
      />
    </div>
  );
}
