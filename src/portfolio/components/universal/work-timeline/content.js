import React from "react";
import { UnorderedList, GroundswellLink } from "./styles";

export default [
  {
    data: (
      <>
        <h3>Senior Technical Consultant</h3>
        <h5>{GroundswellLink}</h5>
        <UnorderedList>
          <li>
            Facilitated the technical architecture of a SaaS application
            designed to serve 600,000 users by leading client facing sessions on
            scalability and data modelling/migration strategies
          </li>
          <li>
            Led the full development lifecycle of a mobile app feature deployed
            to over 13,000 users by performing code reviews, organizing sprints,
            and handling deployments as the developer lead in a team of 6
          </li>
          <li>
            Spearheaded the formalization of the company’s development security
            standards based on OWASP and Salesforce guidelines, resulting in the
            company’s standardization of project security testing
          </li>
          <li>
            Developed excellent communication and time management skills from
            working in a partial remote capacity alongside colleagues and
            clients operating in different time zones
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
        <h5>{GroundswellLink}</h5>
        <UnorderedList>
          <li>
            Fostered a 1.5 year long relationship with a client where I led the
            development and delivery of 2 front end applications after
            transforming high level business needs to project roadmaps
          </li>
          <li>
            Created the front end UI, UX, and architecture for a customer portal
            launched to 40,000 active users by transforming designer mockups to
            HTML, CSS, and JavaScript
          </li>
          <li>
            Delivered a public facing map application that enabled users to
            search and interact with data housed in the client’s Salesforce org,
            logging an average of 8,000 unique searches a day
          </li>
          <li>
            Selectively chosen to present a
            <a
              href="https://www.youtube.com/watch?v=epQQdM29UFU"
              target="_blank"
              rel="noopener noreferrer"
            >
              &nbsp;20 minute talk&nbsp;
            </a>
            to over 200 people at Dreamforce 2018, Salesforce’s annual user
            conference, about JavaScript testing on the Lightning Platform
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
        <h5>{GroundswellLink}</h5>
        <UnorderedList>
          <li>
            Published a Salesforce managed package written in JavaScript that
            improves developer productivity by providing versioning capabilities
            for Salesforce’s Wave Analytics dashboard application
          </li>
          <li>
            Supported the development and release of a custom Salesforce
            integrated subscription system, enabling the client to track
            payments made through Stripe for their 300 person user base
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
        <h5>
          <a
            href="https://www.avanti.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Avanti Commerce
          </a>
        </h5>
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
