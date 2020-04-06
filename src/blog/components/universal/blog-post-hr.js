import React from "react";
import styled from "styled-components";
import FilterHdrOutlinedIcon from "@material-ui/icons/FilterHdrOutlined";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";
import {
  COLLECTION_TRAVELS,
  COLLECTION_TRIPREPORTS
} from "../../util/constants";

const LineContainer = styled.div`
  position: relative;
  overflow: visible;
  height: 1px;
  border: 1px solid #373a47;
  border-collapse: collapse;
  width: 60%;
  margin: 75px auto 0 auto;
`;
const IconContainer = styled.span`
  position: absolute;
  left: calc(50% - 15px);
  width: 30px;
  text-align: center;
  margin-top: -10px;
  padding: 0 5px;
  background-color: rgb(250, 250, 250);
  color: rgb(255, 69, 0);
`;

/**
 * Styled hr element with icon depending on collection being shown
 */
export default function FancyHr({ collection }) {
  let logo;
  switch (collection) {
    case COLLECTION_TRAVELS:
      logo = <PublicOutlinedIcon />;
      break;
    case COLLECTION_TRIPREPORTS:
    default:
      logo = <FilterHdrOutlinedIcon />;
  }

  return (
    <LineContainer>
      <IconContainer>{logo}</IconContainer>
    </LineContainer>
  );
}
