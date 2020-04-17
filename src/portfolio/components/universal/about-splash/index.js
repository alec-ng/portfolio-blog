import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import headshot from "../../../../assets/home/headshot.jpg";
import bg_main from "../../../../assets/home/home-bg-main.jpg";
import resume from "../../../../assets/home/alec-ng-resume.pdf";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import MailIcon from "@material-ui/icons/Mail";
import WorkIcon from "@material-ui/icons/Work";
import DescriptionOutlinedIcon from "@material-ui/icons/Description";

import "./styles.css";

const LandingDiv = styled.div`
  height: 100vh;
  width: 100%;
  background: url(${bg_main}) no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FancyHr = styled.hr`
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
`;

/**
 * Full page height splash component showing summary of myself
 * Quick import from legacy site
 */
export default function AboutSplash(props) {
  return (
    <LandingDiv className="aligner-container">
      <div className="row" style={{ margin: "0" }}>
        <div className="col-md-offset-4"></div>
        <div className="col-md-4">
          <div className="contact-card card">
            <div className="row">
              <div className="col-md-6 py-2">
                <img
                  className="img-fluid headshot d-block mx-auto"
                  src={headshot}
                  alt="Headshot"
                />
              </div>
              <div className="col-md-6 aligner-container custom-justify py-2">
                <div>
                  <div className="name-style">alec ng</div>
                  <LocationOnIcon />
                  &nbsp;&nbsp;Vancouver, Canada
                  <br />
                  <MailIcon />
                  <a href="mailto:alecng94@gmail.com">
                    &nbsp;&nbsp;alecng94@gmail.com
                  </a>
                  <br />
                  <WorkIcon />
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/alecng"
                  >
                    &nbsp;&nbsp;LinkedIn
                  </a>
                  <br />
                  <DescriptionOutlinedIcon />
                  <a target="_blank" rel="noopener noreferrer" href={resume}>
                    &nbsp;&nbsp;Resume
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center">
              <FancyHr />
            </div>
            <div className="row">
              <div className="offset-sm-2 col-sm-4 col-xs-12 text-center p-0">
                <button
                  onClick={props.scrollToContent}
                  type="button"
                  className="section-btn clear"
                >
                  Portfolio
                </button>
              </div>
              <div className="col-sm-4 col-xs-12 text-center p-0">
                <Link to="/blog">
                  <button type="button" className="section-btn clear">
                    Blog
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingDiv>
  );
}
