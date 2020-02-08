import React from "react";

import TextActionContainer from "./../components/text-action-container";
import AboutSplash from "./../components/about-splash";
import ColouredContainer from "./../components/coloured-container";
import WorkTimeline from "./../components/work-timeline";
import ExpertiseSection from "../components/expertise-section";
import ProjectTimeline from "../components/project-timeline";
import ResumePath from "../assets/home/alec-ng-resume.pdf";

const AboutBlurb = (
  <>
    I am a full stack software engineer with 3.5 years industry experience in
    web application development, technical architecture, and business
    consulting.
    <br />
    <br />
    Delivered multiple web portal applications used by over 50,000 users as a
    tech lead responsible for the design, implementation, and release. Expertise
    lies in combining a technical foundation in full stack engineering with
    strong client services and interpersonal skills.
  </>
);

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
            text={AboutBlurb}
            linkPath={ResumePath}
            linkText="View Resume"
          />
        </ColouredContainer>
      </section>

      <ColouredContainer bgColour="#e3e2df" colour="#ea5a4f">
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
        <WorkTimeline />
      </ColouredContainer>

      <ColouredContainer bgColour="white" colour="black">
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
          <h1 className="text-center pb-4">Expertise</h1>
          <div className="px-2 px-sm-3 px-md-4 px-lg-5">
            <ExpertiseSection />
          </div>
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
          text="I am currently open to remote opportunities, full time or contract."
          linkPath="mailto:alecng94@gmail.com"
          linkText="Email"
        />
      </ColouredContainer>
    </>
  );
}
