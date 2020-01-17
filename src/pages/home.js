import React from "react";
import styled from "styled-components";

import AboutSplash from "./../components/about-splash";
import ColouredContainer from "./../components/coloured-container";
import WorkTimeline from "./../components/work-timeline";
import ExpertiseSection from "../components/expertise-section";
import ProjectTimeline from "../components/project-timeline";
import ResumePath from "../assets/home/resume.pdf";

const WhiteParagraph = styled.p`
  font-size: 15px;
  line-height: 25px;
`;
const WhiteBtn = styled.button`
  padding: 10px 30px;
  border-radius: 5px;
  border: 1px solid white;
  background-color: rgb(97, 129, 182);
  font-weight: bold;
`;

export default function Home(props) {
  let sectionRef = React.useRef(null);
  function scrollToContent() {
    sectionRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

  return (
    <>
      <AboutSplash scrollToContent={scrollToContent} />

      <section ref={sectionRef}>
        <ColouredContainer bgColour="rgb(97, 129, 182)" colour="white">
          <h1 className="text-center pb-4">About</h1>
          <div className="row pb-3">
            <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3 text-center">
              <WhiteParagraph>
                I am a software engineer with 3 years industry experience in
                custom web application development, technical architecture, and
                business consulting. My previous work experience involved
                leading the design and development of multiple Lightning
                Communities deployed to over 100,000 combined users. For these
                projects, I acted as a tech lead and was involved in the full
                development lifecycle from roadmap planning, requirement
                gathering, implementation, release, and support.
              </WhiteParagraph>
            </div>
          </div>
          <div className="text-center">
            <WhiteBtn type="button">
              <a
                href={ResumePath}
                rel="noopener noreferrer"
                target="_blank"
                style={{ color: "white" }}
              >
                View Resume
              </a>
            </WhiteBtn>
          </div>
        </ColouredContainer>
      </section>

      <ColouredContainer bgColour="#e3e2df" colour="#ea5a4f">
        <h1 className="text-center">Professional Experience</h1>
        <h5 className="text-center pb-4">
          View on&nbsp;
          <a
            style={{ textDecoration: "underline" }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/alecng"
          >
            LinkedIn
          </a>
        </h5>
        <WorkTimeline />
      </ColouredContainer>

      <ColouredContainer bgColour="white" colour="black">
        <h1 className="text-center pb-4">Expertise</h1>
        <div className="px-2 px-sm-3 px-md-4 px-lg-5">
          <ExpertiseSection />
        </div>
      </ColouredContainer>

      <ColouredContainer bgColour="#e3e2df" colour="#ea5a4f">
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
        <ProjectTimeline />
      </ColouredContainer>

      <ColouredContainer bgColour="rgb(97, 129, 182)" colour="white">
        <h1 className="text-center pb-4">Contact</h1>
        <div className="row pb-3">
          <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3 text-center">
            <WhiteParagraph className="pb-3">
              I am currently open to remote, full time opportunities.
            </WhiteParagraph>
          </div>
        </div>
        <div className="text-center">
          <WhiteBtn type="button">
            <a href="mailto:alecng94@gmail.com" style={{ color: "white" }}>
              Email
            </a>
          </WhiteBtn>
        </div>
      </ColouredContainer>
    </>
  );
}
