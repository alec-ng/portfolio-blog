import React from "react";
import AboutSplash from "./../components/about-splash";
import ColouredContainer from "./../components/coloured-container";
import WorkTimeline from "./../components/work-timeline";
import ExpertiseSection from "../components/expertise-section";
import ProjectTimeline from "../components/project-timeline";

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
          <h1 className="text-center">About</h1>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-8">
              <p>
                I am a software engineer with 3 years industry experience in
                custom web application development, technical architecture, and
                business consulting. During my tenure as a Salesforce technical
                consultant, I led the design and development of multiple
                Lightning Communities deployed to over 100,000 combined users.
                For these projects, I acted as a tech lead and was involved in
                the full development lifecycle from roadmap planning,
                requirement gathering, implementation, release, and support.
                View Resume button
              </p>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4">
              <img
                src="https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/LakeWakatipuNewZealand.jpg?crop=0,30,4928,2710&wid=4000&hei=2200&scl=1.232"
                className="img-fluid "
              ></img>
            </div>
          </div>
        </ColouredContainer>
      </section>

      <ColouredContainer bgColour="#e3e2df" colour="#ea5a4f">
        <h1 className="text-center">Professional Experience</h1>
        <h5 className="text-center">
          View on&nbsp;
          <a
            style={{ textDecoration: "underline" }}
            target="_blank"
            href="https://www.linkedin.com/in/alecng"
          >
            LinkedIn
          </a>
        </h5>
        <WorkTimeline />
      </ColouredContainer>

      <ColouredContainer bgColour="white" colour="black">
        <h1 className="text-center pb-3">Expertise</h1>
        <div className="px-2 px-sm-3 px-md-4 px-lg-5">
          <ExpertiseSection />
        </div>
      </ColouredContainer>

      <ColouredContainer bgColour="#e3e2df" colour="#ea5a4f">
        <h1 className="text-center">Projects</h1>
        <h5 className="text-center">
          View on&nbsp;
          <a
            style={{ textDecoration: "underline" }}
            target="_blank"
            href="https://github.com/alec-ng/"
          >
            GitHub
          </a>
        </h5>
        <ProjectTimeline />
      </ColouredContainer>

      <ColouredContainer bgColour="rgb(97, 129, 182)" colour="white">
        <h1 className="text-center">Contact</h1>
        <p>I am currently open to remote, full time opportunities.</p>
      </ColouredContainer>
    </>
  );
}
