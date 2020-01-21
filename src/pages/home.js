import React, { useEffect } from "react";

import TextActionContainer from "./../components/text-action-container";
import AboutSplash from "./../components/about-splash";
import ColouredContainer from "./../components/coloured-container";
import WorkTimeline from "./../components/work-timeline";
import ExpertiseSection from "../components/expertise-section";
import ProjectTimeline from "../components/project-timeline";
import ResumePath from "../assets/home/resume.pdf";

export default function Home(props) {
  document.title = "Alec Ng";
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
          <TextActionContainer
            text={`I am a software engineer with 3 years industry experience in custom web application 
              development, technical architecture, and business consulting. My accomplishments 
              include leading the design and development of multiple Lightning Communities deployed to 
              over 100,000 combined users. For these projects, I acted as a tech lead and was involved 
              in the full development lifecycle from roadmap planning, requirement gathering, implementation, 
              release, and support.`}
            linkPath={ResumePath}
            linkText="View Resume"
          />
        </ColouredContainer>
      </section>

      <ColouredContainer bgColour="#e3e2df" colour="#ea5a4f">
        <h1 className="text-center">Professional Experience</h1>
        <h5 className="text-center pb-4">
          View on
          <a
            style={{ textDecoration: "underline" }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/alecng"
          >
            &nbsp;LinkedIn
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
        <TextActionContainer
          text="I am currently open to remote, full time opportunities."
          linkPath="mailto:alecng94@gmail.com"
          linkText="Email"
        />
      </ColouredContainer>
    </>
  );
}
