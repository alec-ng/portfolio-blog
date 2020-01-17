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
        <h2>npm package / React Library</h2>
        <h3>scapbook-editor</h3>
        <UnorderedList>
          <li>Some points</li>
          <li>Github logo override</li>
          <li>Include embedded demo gif</li>
        </UnorderedList>
      </>
    ),
    dateLabel: "Jan 2020"
  },
  {
    data: (
      <>
        <h2>React Application</h2>
        <h3>scapbook-cms</h3>
        <UnorderedList>
          <li>Some points</li>
          <li>Github logo override</li>
          <li>Include embedded demo gif</li>
        </UnorderedList>
      </>
    ),
    dateLabel: "Jan 2020"
  },
  {
    data: (
      <>
        <h2>React Application</h2>
        <h3>https://alecng.ca</h3>
        <UnorderedList>
          <li>Some points</li>
          <li>Github logo override</li>
        </UnorderedList>
      </>
    ),
    dateLabel: "Dec 2019"
  },
  {
    data: (
      <>
        <h2>Computer Vision Script</h2>
        <h3>fully-convolutional-network-semantic-segmentation</h3>
        <UnorderedList>
          <li>Some points</li>
          <li>Github logo override</li>
        </UnorderedList>
      </>
    ),
    dateLabel: "Jan 2017"
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
