import React from "react";

import AboutSplash from "./universal/about-splash";
import SummarySection from "./universal/summary-section";
import WorkTimeline from "./universal/work-timeline";
import ExpertiseCard from "./universal/expertise-card/";
import ProjectTimeline from "./universal/project-timeline";
import ContactSection from "./universal/contact-section";

import ColouredContainer from "./generic/coloured-container";

const primaryBlue = "rgb(97, 129, 182)";
const primaryTextColor = "rgb(48, 62, 73)";
const greyBgColor = "rgb(227, 226, 223)";
const orangeHighlightColor = "rgb(234, 90, 79)";
const white = "rgb(255, 255, 255)";

export default function Home() {
  const sectionRef = React.useRef(null);
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
        <ColouredContainer bgColour={primaryBlue} colour={white}>
          <SummarySection />
        </ColouredContainer>
      </section>

      <ColouredContainer bgColour={greyBgColor} colour={orangeHighlightColor}>
        <WorkTimeline />
      </ColouredContainer>

      <ColouredContainer bgColour={white} colour={primaryTextColor}>
        <ExpertiseCard />
      </ColouredContainer>

      <ColouredContainer bgColour={greyBgColor} colour={orangeHighlightColor}>
        <ProjectTimeline />
      </ColouredContainer>

      <ColouredContainer bgColour={primaryBlue} colour={white}>
        <ContactSection />
      </ColouredContainer>
    </>
  );
}
