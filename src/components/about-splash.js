import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import headshot from "./../assets/home/headshot.jpg";
import bg_main from "./../assets/home/home-bg-main.jpg";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import MailIcon from "@material-ui/icons/Mail";
import WorkIcon from "@material-ui/icons/Work";
import DescriptionIcon from "@material-ui/icons/Description";

import "./../pages/home.css";

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
  height: inherit;
`;

/**
 * Full page height splash component showing summary of myself
 */
export default function AboutSplash(props) {
  return (
    <LandingDiv className="aligner-container">
      <div className="row">
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
                  <span className="name-style">alec ng</span>
                  <br />
                  <LocationOnIcon /> Vancouver, Canada
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
                  <DescriptionIcon />
                  Resume
                </div>
              </div>
            </div>
            <div className="text-center">
              <hr />
            </div>
            <div className="row">
              <div className="col-sm-4 col-xs-12 text-center p-0">
                <button
                  onClick={props.scrollToContent}
                  type="button"
                  className="section-btn clear"
                >
                  Portfolio
                </button>
              </div>
              <div className="col-sm-4 col-xs-12 text-center p-0">
                <Link data-bg="photography" to="/photography">
                  <button type="button" className="section-btn clear">
                    Photography
                  </button>
                </Link>
              </div>
              <div className="col-sm-4 col-xs-12 text-center p-0">
                <Link data-bg="tripreports" to="/blog">
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
