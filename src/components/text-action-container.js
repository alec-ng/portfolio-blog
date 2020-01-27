import React from "react";
import styled from "styled-components";

const WhiteParagraph = styled.p`
  font-size: 15px;
  line-height: 25px;
`;
const WhiteBtn = styled.button`
  padding: 10px 30px;
  border-radius: 5px;
  border: 1px solid white;
  background-color: rgb(97, 129, 182);
  font-weight: bold;
  color: white;
`;

/**
 * Simple text + button combination
 */
export default function TextActionContainer(props) {
  return (
    <>
      <div className="row pb-3">
        <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3 text-center">
          <WhiteParagraph>{props.text}</WhiteParagraph>
        </div>
      </div>
      <div className="text-center">
        <a href={props.linkPath} rel="noopener noreferrer" target="_blank">
          <WhiteBtn type="button">{props.linkText}</WhiteBtn>
        </a>
      </div>
    </>
  );
}
