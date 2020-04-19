import React, { useRef } from "react";

import AboutSplash from "./components/universal/about-splash";
import SummarySection from "./components/universal/summary-section";
import WorkTimeline from "./components/universal/work-timeline";
import ExpertiseCard from "./components/universal/expertise-card/";
import ProjectTimeline from "./components/universal/project-timeline";
import ScrollToTop from "./components/generic/scroll-top";
import ColouredContainer from "./components/generic/coloured-container";

const primaryBlue = "rgb(97, 129, 182)";
const primaryTextColor = "rgb(48, 62, 73)";
const orangeHighlightColor = "rgb(234, 90, 79)";
const white = "rgb(255, 255, 255)";
const canvas = "#fafafa";

export default function Home() {
  const startContentRef = useRef(null);
  const topAnchorRef = useRef(null);

  function scrollToContent() {
    startContentRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

  return (
    <>
      <div ref={topAnchorRef} />

      <AboutSplash scrollToContent={scrollToContent} />

      <section ref={startContentRef}>
        <ColouredContainer bgColour={primaryBlue} colour={white}>
          <SummarySection />
        </ColouredContainer>
      </section>

      <ColouredContainer bgColour={canvas} colour={orangeHighlightColor}>
        <WorkTimeline />
      </ColouredContainer>

      <ColouredContainer bgColour={primaryBlue} colour={primaryTextColor}>
        <ExpertiseCard />
      </ColouredContainer>

      <ColouredContainer bgColour={canvas} colour={orangeHighlightColor}>
        <ProjectTimeline />
      </ColouredContainer>

      <ScrollToTop anchorRef={topAnchorRef} />
    </>
  );
}
