import React from "react";
import styled from "styled-components";
import VerticalTimeline from "./vertical-timeline";
import GitHubIcon from "@material-ui/icons/GitHub";
import CodeIcon from "@material-ui/icons/Code";

import EditorGif from "../../assets/home/brandywine-editor.gif";
import CmsGif from "../../assets/home/brandywine-cms.gif";
import BlogGif from "../../assets/home/blog.gif";
import ProjectConvolutionalPhoto from "../../assets/home/fully-convolutional.png";

const contentStyle = {
  background: "white",
  color: "#303e49"
};
const iconStyle = {
  background: "#ea5a4f",
  color: "#fff"
};
const icon = <CodeIcon />;

const StyledTitle = styled.h3`
  color: #ea5a4f;
  overflow-wrap: break-word;
`;

function SourceLink(props) {
  return (
    <p className="text-right">
      <a href={props.link} rel="noopener noreferrer" target="_blank">
        <GitHubIcon />
        &nbsp;
        <i>Source</i>
      </a>
    </p>
  );
}

const content = [
  {
    data: (
      <>
        <StyledTitle>react-brandywine-editor</StyledTitle>
        <h2>npm package / React Library</h2>
        <p>
          An open source WYSIWYG-like block editor for creating blogging
          content. Try out a
          <a
            href="https://ld0lq.csb.app/"
            rel="noopener noreferrer"
            target="_blank"
          >
            &nbsp;demo&nbsp;
          </a>
          hosted on
          <a
            href="https://codesandbox.io/s/react-brandywine-editor-ld0lq"
            rel="noopener noreferrer"
            target="_blank"
          >
            &nbsp;codesandbox
          </a>
          , or check out my <a href="/blog">blog</a> that uses content produced
          and rendered with react-brandywine-editor.
        </p>
        <br />
        <img
          className="img-fluid img-thumbnail"
          src={EditorGif}
          alt="Brandywine Editor"
        />
        <SourceLink link="https://github.com/alec-ng/react-brandywine-editor" />
      </>
    ),
    dateLabel: "Jan 2020"
  },
  {
    data: (
      <>
        <StyledTitle>react-brandywine-cms</StyledTitle>
        <h2>React Application</h2>
        <p>
          A custom CMS application created to manage my blog. Content is created
          with react-brandywine-editor and data is managed in Firebase
          Cloudstore, a NoSQL, document based database.
        </p>
        <br />
        <img
          className="img-fluid img-thumbnail"
          src={CmsGif}
          alt="Brandywine Editor"
        />
        <SourceLink link="https://github.com/alec-ng/brandywine-cms/" />
      </>
    ),
    dateLabel: "Jan 2020"
  },
  {
    data: (
      <>
        <StyledTitle>alecng.ca/blog</StyledTitle>
        <h2>React Application</h2>
        <p>
          Custom blogging platform that showcases content managed with
          react-brandywine-cms and produced by react-brandywine-editor. A single
          page application approach was used for content navigation. See the
          live version <a href="/blog">here</a>.
        </p>
        <br />
        <img
          className="img-fluid img-thumbnail"
          src={BlogGif}
          alt="Personal Blog"
        />
        <SourceLink link="https://github.com/alec-ng/portfolio" />
      </>
    ),
    dateLabel: "Dec 2019"
  },
  {
    data: (
      <>
        <StyledTitle>
          fully-convolutional-network-semantic-segmentation
        </StyledTitle>
        <h2>Computer Vision Script</h2>
        <p>
          Python script that identifies a human in an RGB image and segments the
          figure from the image background. Utilizes a trained, convolutional
          neural network based off the academic paper
          <a
            href="https://people.eecs.berkeley.edu/~jonlong/long_shelhamer_fcn.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            &nbsp;Fully Convolutional Neural Networks for Semantic Segmentation
          </a>
          .
        </p>
        <br />
        <img
          className="img-fluid img-thumbnail"
          src={ProjectConvolutionalPhoto}
          alt="Semantic segmentation demo"
        />
        <SourceLink link="https://github.com/alec-ng/fully-convolutional-network-semantic-segmentation" />
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
