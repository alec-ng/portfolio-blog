import React from "react";
import TextActionContainer from "../generic/text-action-container";
import ResumePath from "../../../assets/home/alec-ng-resume.pdf";

const summary = `
  Frontend Software Engineer with 3.5 years industry experience in web
  application development and  technical architecture. My expertise lies in
  combining modern frontend engineering practices with a customer focused approach 
  to design to deliver innovative user experiences.
`;

export default function SummarySection() {
  return (
    <div>
      <h1 className="text-center pb-4">About</h1>
      <TextActionContainer
        text={summary}
        linkPath={ResumePath}
        linkText="View Resume"
      />
    </div>
  );
}
