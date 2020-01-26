import React from "react";
import styled from "styled-components";
import useUrlState from "./../hooks/useUrlState";
import {
  COLLECTION_TRAVELS,
  COLLECTION_TRIPREPORTS
} from "./../util/constants";
import FilterHdrOutlinedIcon from "@material-ui/icons/FilterHdrOutlined";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";

const LineContainer = styled.div`
  position: relative;
  overflow: visible;
  height: 1px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-collapse: collapse;
  width: 75%;
  margin: 75px auto 0 auto;
`;
const IconContainer = styled.span`
  position: absolute;
  left: 50%;
  width: 30px;
  text-align: center;
  margin-top: -10px;
  padding: 0 5px;
  background-color: white;
  color: rgb(255, 69, 0);
`;

export default function FancyHr(props) {
  const { collection } = useUrlState();
  let logo;
  switch (collection) {
    case COLLECTION_TRAVELS:
      logo = <PublicOutlinedIcon />;
      break;
    default:
      logo = <FilterHdrOutlinedIcon />;
  }

  return (
    <LineContainer>
      <IconContainer>{logo}</IconContainer>
    </LineContainer>
  );
}
