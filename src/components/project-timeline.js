import React from "react";
import VerticalTimeline from "./vertical-timeline";
import GitHubIcon from "@material-ui/icons/GitHub";
import styled from "styled-components";

const UnorderedList = styled.ul`
  color: #303e49;
  li {
    margin-bottom: 10px;
  }
`;
const contentStyle = {
  background: "white",
  color: "#ea5a4f"
};
const iconStyle = {
  background: "#ea5a4f",
  color: "#fff"
};
const icon = <GitHubIcon />;

const content = [
  {
    data: (
      <>
        <h2>React Application</h2>
        <h3>scapbook-editor</h3>
        <UnorderedList>
          <li>Some points</li>
          <li>Github logo override</li>
          <li>Include embedded demo gif</li>
        </UnorderedList>
      </>
    ),
    dateLabel: "Jan-Sep 2019"
  },
  {
    data: (
      <>
        <h2>React Application</h2>
        <h3>scapbook-editor</h3>
        <UnorderedList>
          <li>Some points</li>
          <li>Github logo override</li>
          <li>Include embedded demo gif</li>
        </UnorderedList>
      </>
    ),
    dateLabel: "Jan-Sep 2019"
  }
];

export default function ProjectTimeline(props) {
  return (
    <VerticalTimeline
      contentStyle={contentStyle}
      iconStyle={iconStyle}
      icon={icon}
      content={content}
    />
  );
}
