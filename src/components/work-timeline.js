import React from "react";
import VerticalTimeline from "./vertical-timeline";
import WorkIcon from "@material-ui/icons/Work";
import styled from "styled-components";

const UnorderedList = styled.ul`
  color: #303e49;
  padding-inline-start: 20px;
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
            Managed a team of 6 as a tech lead in the development and launch of
            a Salesforce mobile app feature deployed to over 13,000 users
          </li>
          <li>
            Led client facing software architecture engagements on security,
            scalability and data migration strategies for a customer portal
            designed to serve 600,000 users across 3 continents
          </li>
          <li>
            Formalized and documented the company’s security guidelines for
            Salesforce development based on OWASP and Salesforce standards
          </li>
        </UnorderedList>
      </>
    ),
    dateLabel: "Jan 2019 -Sep 2019"
  },
  {
    data: (
      <>
        <h3>Technical Consultant</h3>
        <h2>{GroundswellLink}</h2>
        <UnorderedList>
          <li>
            Designed the front end architecture for a customer portal launched
            to 40,000 active users using Salesforce’s Aura Components framework
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
          <li>
            Developed a cross-browser, public facing Google Maps application
            that has logged an average of 8,000 unique searches a day
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
            Published a Salesforce managed package written in JavaScript and
            Apex that improves developer productivity by providing dashboard
            versioning capabilities for the Wave Analytics application
          </li>
          <li>
            Supported the development and release of a custom Stripe payment
            subscription system built on Salesforce to a 300 person user base
          </li>
        </UnorderedList>
      </>
    ),
    dateLabel: "Apr 2016 -Aug 2016"
  },
  {
    data: (
      <>
        <h3>.NET Developer Co-op</h3>
        <h2>
          <a
            href="https://www.avanti.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Avanti Commerce
          </a>
        </h2>
        <UnorderedList>
          <li>
            Optimized an internal PDF exporting tool by converting it from a
            server to client side JavaScript application, achieving a 75%
            reduction in wait time
          </li>
          <li>
            Spearheaded the refactoring of an ASP.NET test suite following Agile
            methodology, resulting in a 20% increase in code coverage
          </li>
        </UnorderedList>
      </>
    ),
    dateLabel: "May 2015 - Dec 2015"
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
