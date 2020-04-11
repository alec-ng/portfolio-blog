import styled from "styled-components";

const primaryColour = "rgb(255, 69, 0)";
const horizPadding = "0 20px";

export const Divider = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  width: 100%;
  margin: 10px 0;
`;

export const StyledSidebarButton = styled.button`
  font-weight: ${props => (props.active ? "700" : "100")};
  color: rgb(255, 69, 0);
  width: 100%;
  text-align: left;
  background-color: rgba(55, 58, 71, 1);
  border: none;
  padding: ${horizPadding};
  height: 25px;
  font-size: 12px;
  display: block;
  cursor: pointer;
  &:hover {
    color: rgb(255, 125, 0);
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

export const PrimaryNavButton = styled(StyledSidebarButton)`
  height: 28px;
  font-size: 15px;
`;

export const StyledHeavyText = styled.b`
  font-weight: 700;
  color: ${primaryColour};
`;

export const PaddedContainer = styled.div`
  padding: ${horizPadding};
`;
