import React from "react";
import TextActionContainer from "../generic/text-action-container";

export default function ContactSection() {
  return (
    <div>
      <h1 className="text-center pb-4">Contact</h1>
      <TextActionContainer
        text="I am currently open to frontend focused software engineering opportunities in Vancouver, BC, or remote."
        linkPath="mailto:alecng94@gmail.com"
        linkText="Email"
      />
    </div>
  );
}
