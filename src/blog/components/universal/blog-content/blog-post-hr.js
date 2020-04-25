import React from "react";
import styled from "styled-components";
import FilterHdrOutlinedIcon from "@material-ui/icons/FilterHdrOutlined";

export default function BlogPostDivider() {
  return (
    <LineContainer>
      <IconContainer>
        <FilterHdrOutlinedIcon />
      </IconContainer>
    </LineContainer>
  );
}

const LineContainer = styled.div`
  position: relative;
  overflow: visible;
  height: 1px;
  border: 1px solid #373a47;
  border-collapse: collapse;
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
