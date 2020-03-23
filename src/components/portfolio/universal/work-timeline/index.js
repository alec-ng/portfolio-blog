import React from "react";
import WorkIcon from "@material-ui/icons/Work";
import VerticalTimeline from "../../generic/vertical-timeline";
import content from "./content";

const contentStyle = {
  background: "white",
  color: "#ea5a4f"
};
const iconStyle = {
  background: "#ea5a4f",
  color: "#fff"
};

export default function WorkTimeline() {
  return (
    <div>
      <h1 className="text-center">Professional Experience</h1>
      <h5 className="text-center pb-4">
        View on &nbsp;
        <a
          style={{ textDecoration: "underline" }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/alecng"
        >
          LinkedIn
        </a>
      </h5>
      <VerticalTimeline
        contentStyle={contentStyle}
        iconStyle={iconStyle}
        icon={<WorkIcon />}
        content={content}
      />
    </div>
  );
}
