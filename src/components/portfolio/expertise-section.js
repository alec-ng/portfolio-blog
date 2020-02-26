import React from "react";
import styled from "styled-components";
import Chip from "@material-ui/core/Chip";

import ReactLogo from "../../assets/home/react.png";
import SalesforceLogo from "../../assets/home/salesforce.png";

const ImageOffset = "50px";

const CardImage = styled.img`
  height: auto;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 50px;
  margin-top: -${ImageOffset};
`;

const CardContainer = styled.div`
  margin-top: ${ImageOffset};

  @media (max-width: 574px) {
    & > div.card {
      margin-top: 75px;
    }
  }
`;

const Card = styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const StyledChip = styled(Chip)`
  &.MuiChip-root {
    margin: 0 5px 5px 0;
  }
  &.MuiChip-colorPrimary {
    color: rgb(255, 69, 0);
    border: 1px solid rgb(255, 69, 0);
  }
  &.MuiChip-label {
    white-space: normal;
  }
`;

function PrimaryChip(props) {
  return <StyledChip variant="outlined" color="primary" label={props.label} />;
}

export default function ExpertiseSection(props) {
  return (
    <CardContainer className="card-deck">
      <Card className="card">
        <CardImage src={ReactLogo} />
        <div className="card-body">
          <h2 className="text-center">Web Engineering</h2>
          <p>
            Extensive full stack web application experience using industry
            standard tools. Scroll down to see some of my latest projects built
            with React and Firebase.
          </p>
          <section className="mt-3">
            <h4>Front-end</h4>
            <PrimaryChip label="React" />
            <PrimaryChip label="ES6 JavaScript" />
            <PrimaryChip label="Redux" />
            <PrimaryChip label="Node.js" />
            <PrimaryChip label="Jest" />
            <PrimaryChip label="Enzyme" />
            <PrimaryChip label="HTML5 / CSS3" />
            <PrimaryChip label="Webpack" />
          </section>
          <section className="mt-3">
            <h4>Back-end</h4>
            <PrimaryChip label="Google Firebase" />
            <PrimaryChip label="NoSQL/Relational Databases" />
            <PrimaryChip label="Salesforce Apex (Java-inspired OOP Language)" />
          </section>
          <section className="mt-3">
            <h4>Software Practices</h4>
            <PrimaryChip label="CI/CD" />
            <PrimaryChip label="Agile Methodology" />
            <PrimaryChip label="Git" />
            <PrimaryChip label="Open Source" />
            <PrimaryChip label="TDD/BDD" />
          </section>
        </div>
      </Card>
      <Card className="card">
        <CardImage src={SalesforceLogo} />
        <div className="card-body">
          <h2 className="text-center">Salesforce</h2>
          <p>
            Deep understanding of Salesforce capabilities through custom and
            complex technical implmentations that push the limits the platform.
          </p>
          <section className="mt-3">
            <h4>
              <a
                href="https://trailhead.salesforce.com/credentials/certification-detail-print?searchString=HFo8huVvKpFZQubeQ1Bg5ZYpXZBRcOLDxXKRmRuNdS0CrZ+aqb5MhHrfb+au79Ht"
                target="_blank"
                rel="noopener noreferrer"
              >
                Certifications
              </a>
            </h4>
            <PrimaryChip label="Administrator I" />
            <PrimaryChip label="Platform Developer I" />
          </section>
          <section className="mt-3">
            <h4>Product Clouds</h4>
            <PrimaryChip label="Community" />
            <PrimaryChip label="Service" />
            <PrimaryChip label="Sales" />
          </section>
          <section className="mt-3">
            <h4>Custom Development</h4>
            <PrimaryChip label="Lightning Web Components" />
            <PrimaryChip label="Aura Components" />
            <PrimaryChip label="SOQL" />
            <PrimaryChip label="Apex" />
            <PrimaryChip label="Salesforce DX" />
            <PrimaryChip label="Lightning Experience" />
            <PrimaryChip label="Informatica" />
          </section>
        </div>
      </Card>
    </CardContainer>
  );
}
