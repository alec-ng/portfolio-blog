import styled from "styled-components";
import { appbarHeight } from "../layout/appbar";

const BaseMapButton = styled.button`
  /* styles to match leaflet */
  background-color: white;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
  text-decoration: none;
  color: black;
  position: absolute;
  text-align: center;
  color: black;
  &:hover {
    background-color: #f4f4f4;
  }

  /* custom styles */
  border: 1px solid rgba(0, 0, 0, 0);
  padding: 0;
  width: 26px;
  height: 26px;
  border-radius: 5px;
  z-index: 401;
  position: absolute;
  text-align: center;
  left: 20px;

  color: ${props => (props.active ? "rgb(255,69,0)" : "black")};
  box-shadow: ${props =>
    props.active
      ? "0 1px 5px rgba(255,69,0,0.65)"
      : "0 1px 5px rgba(0,0,0,0.65)"};
`;

export const FilterButton = styled(BaseMapButton)`
  top: 70px;
`;

export const ZoomOutButton = styled(BaseMapButton)`
  top: 105px;
`;

export const MapContainer = styled.div`
  height: calc(100% - ${appbarHeight});
`;

export const ControlsContainer = styled.div`
  position: relative;
`;

export const MapStyles = {
  height: "100%"
};
