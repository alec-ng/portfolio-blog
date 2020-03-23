import React from "react";
import styled from "styled-components";
import GitHubIcon from "@material-ui/icons/GitHub";

export const Title = styled.h3`
  color: #ea5a4f;
  overflow-wrap: break-word;
`;

export function Link(props) {
  return (
    <p className="text-right">
      <a href={props.link} rel="noopener noreferrer" target="_blank">
        <GitHubIcon />
        &nbsp;
        <i>Source</i>
      </a>
    </p>
  );
}
