import styled from "styled-components";

const primaryColour = "rgb(255, 69, 0)";
const horizPadding = "0 20px";

export const Divider = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  width: 100%;
  margin: 15px 0;
`;

export const StyledSidebarButton = styled.button`
  width: 100%;
  text-align: left;
  background-color: rgba(55, 58, 71, 1);
  border: none;
  padding: ${horizPadding};
  height: 25px;
  display: block;
  cursor: pointer;
  color: ${props => (props.active ? "rgb(255, 69, 0)" : "rgb(184, 183, 173)")};

  & svg {
    color: rgb(255, 69, 0);
  }
  &:hover {
    color: rgb(255, 69, 0);
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

export const StyledHeavyText = styled.b`
  font-weight: 700;
  color: ${primaryColour};
`;

export const PaddedContainer = styled.div`
  padding: ${horizPadding};
`;
