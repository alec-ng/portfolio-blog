import React from "react";
import { Title, Link } from "./styles";

import EditorGif from "../../../../assets/home/brandywine-editor.gif";
import CmsGif from "../../../../assets/home/brandywine-cms.gif";
import BlogGif from "../../../../assets/home/blog.gif";
import ProjectConvolutionalPhoto from "../../../../assets/home/fully-convolutional.png";

export default [
  {
    data: (
      <>
        <Title>react-brandywine-editor</Title>
        <h5>npm package / React Library</h5>
        <p>
          An open source WYSIWYG block editor for creating blogging content. Try
          out a
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
        <Link link="https://github.com/alec-ng/react-brandywine-editor" />
      </>
    ),
    dateLabel: "Mar 2020"
  },
  {
    data: (
      <>
        <Title>react-brandywine-cms</Title>
        <h2>React Application</h2>
        <p>
          A custom CMS application created to manage my blog. Content is created
          with react-brandywine-editor and data stored in a NoSQL Firebase
          database.
        </p>
        <br />
        <img
          className="img-fluid img-thumbnail"
          src={CmsGif}
          alt="Brandywine Editor"
        />
        <Link link="https://github.com/alec-ng/brandywine-cms/" />
      </>
    ),
    dateLabel: "Jan 2020"
  },
  {
    data: (
      <>
        <Title>alecng.ca/blog</Title>
        <h5>React Application</h5>
        <p>
          Personal blog where I write about my hikes and travels. See the live
          version <a href="/blog">here</a>.
        </p>
        <br />
        <img
          className="img-fluid img-thumbnail"
          src={BlogGif}
          alt="Personal Blog"
        />
        <Link link="https://github.com/alec-ng/portfolio" />
      </>
    ),
    dateLabel: "Dec 2019"
  },
  {
    data: (
      <>
        <Title>fully-convolutional-network-semantic-segmentation</Title>
        <h5>Computer Vision Script</h5>
        <p>
          Python script that identifies a human in an RGB image and segments the
          figure from the image background, using a trained convolutional neural
          network.
        </p>
        <br />
        <img
          className="img-fluid img-thumbnail"
          src={ProjectConvolutionalPhoto}
          alt="Semantic segmentation demo"
        />
        <Link link="https://github.com/alec-ng/fully-convolutional-network-semantic-segmentation" />
      </>
    ),
    dateLabel: "Jan 2017"
  }
];
