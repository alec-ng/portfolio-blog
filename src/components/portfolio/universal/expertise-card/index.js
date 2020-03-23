import React from "react";
import CodeIcon from "../../../../assets/home/code.png";
import { CardContainer, Card, CardImage, PrimaryChip } from "./styles";

export default function ExpertiseSection() {
  return (
    <div className="px-2 px-sm-3 px-md-4 px-lg-5 mt-5">
      <CardContainer className="card-deck">
        <Card className="card">
          <CardImage src={CodeIcon} />
          <div className="card-body">
            <h1 className="text-center">Expertise</h1>
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
              <PrimaryChip label="SQL" />
              <PrimaryChip label="NoSQL Databases" />
              <PrimaryChip label="Relational Database Design" />
              <PrimaryChip label="Salesforce Apex (Java-inspired OOP language)" />
            </section>
            <section className="mt-3">
              <h4>Software Practices</h4>
              <PrimaryChip label="CI/CD" />
              <PrimaryChip label="Agile" />
              <PrimaryChip label="Git" />
              <PrimaryChip label="Open Source" />
              <PrimaryChip label="TDD/BDD" />
            </section>
            <section className="mt-3">
              <h4>Salesforce</h4>
              <PrimaryChip label="Certified Platform Developer I" />
              <PrimaryChip label="Certified Administrator" />
              <PrimaryChip label="Aura Components" />
              <PrimaryChip label="LWC" />
              <PrimaryChip label="Apex" />
              <PrimaryChip label="SFDX" />
              <PrimaryChip label="SOQL" />
              <PrimaryChip label="Community Cloud" />
              <PrimaryChip label="Service Cloud" />
            </section>
          </div>
        </Card>
      </CardContainer>
    </div>
  );
}
