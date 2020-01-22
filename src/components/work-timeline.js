import React from "react";
import VerticalTimeline from "./vertical-timeline";
import WorkIcon from "@material-ui/icons/Work";
import styled from "styled-components";

const UnorderedList = styled.ul`
  color: #303e49;
  li {
    margin-bottom: 10px;
  }
`;
const contentStyle = {
  background: "white",
  color: "#ea5a4f"
};
const iconStyle = {
  background: "#ea5a4f",
  color: "#fff"
};
const icon = <WorkIcon />;

const GroundswellLink = (
  <a
    href="https://gscloudsolutions.com/"
    target="_blank"
    rel="noopener noreferrer"
  >
    Groundswell Cloud Solutions
  </a>
);

const content = [
  {
    data: (
      <>
        <h3>Senior Technical Consultant</h3>
        <h2>{GroundswellLink}</h2>
        <UnorderedList>
          <li>
            Acted as tech lead for a team of 6 in the design and development of
            a mobile app feature deployed to over TODO> users
          </li>
          <li>
            Led and facilitated software architecture discussions between the
            company and the client for a global lightning community to be rolled
            out to TODO users
          </li>
          <li>
            Formalized and documented the company’s security guidelines for
            Salesforce development based on industry and Salesforce standards
          </li>
        </UnorderedList>
      </>
    ),
    dateLabel: "Jan-Sep 2019"
  },
  {
    data: (
      <>
        <h3>Technical Consultant</h3>
        <h2>{GroundswellLink}</h2>
        <UnorderedList>
          <li>
            Designed the front end architecture, UI, and UX for a responsive
            Lightning Community launched to 40,000 active users
          </li>
          <li>
            Acted as principal consultant for a client by planning future
            roadmaps, creating statements of work and supporting production
            issues
          </li>
          <li>
            Selectively chosen by Salesforce to present a
            <a
              href="https://www.youtube.com/watch?v=epQQdM29UFU"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              20 minute talk{" "}
            </a>
            at Dreamforce 2018 about JavaScript testing on the Lightning
            Platform
          </li>
        </UnorderedList>
      </>
    ),
    dateLabel: "Sept 2017 - Jan 2019"
  },
  {
    data: (
      <>
        <h3>Software Engineer Co-op</h3>
        <h2>{GroundswellLink}</h2>
        <UnorderedList>
          <li>
            Supported the development and release of a custom Stripe
            subscription system on Salesforce to over 300 active users
          </li>
        </UnorderedList>
      </>
    ),
    dateLabel: "Apr-Aug 2016"
  }
];

export default function WorkTimeline(props) {
  return (
    <VerticalTimeline
      contentStyle={contentStyle}
      iconStyle={iconStyle}
      icon={icon}
      content={content}
    />
  );
}
