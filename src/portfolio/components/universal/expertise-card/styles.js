import React from "react";
import styled from "styled-components";
import Chip from "@material-ui/core/Chip";

const ImageOffset = "50px";

export const CardImage = styled.img`
  height: auto;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 50px;
  margin-top: -${ImageOffset};
`;

export const CardContainer = styled.div`
  margin-top: ${ImageOffset};
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 574px) {
    & > div.card {
      margin-top: 75px;
    }
  }
`;

export const Card = styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #fafafa;
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
export function PrimaryChip(props) {
  return <StyledChip variant="outlined" color="primary" label={props.label} />;
}
