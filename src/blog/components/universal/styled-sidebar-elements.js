import styled from "styled-components";

const primaryColour = "rgb(255, 69, 0)";

export const StyledSidebarButton = styled.button`
  font-weight: ${props => (props.active ? "700" : "100")};
  color: rgb(255, 69, 0);
  background: none;
  border: none;
  padding: 0;
  display: block;
  cursor: pointer;
  &:hover {
    color: rgb(255, 125, 0);
  }
`;

export const StyledHeavyText = styled.b`
  font-weight: 700;
  color: ${primaryColour};
`;
