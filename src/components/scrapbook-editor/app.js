import React from "react";
import { useStateValue } from "./state";
import styled from "styled-components";
import "./styles.css";
import Toolbar from "./toolbar";
import Canvas from "./canvas";
import PreviewButton from "./components/preview-button";

/**
 * Highest level rendering component
 */
export default function App(props) {
  const BaseContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
    display: flex;
    height: 100%;
    min-width: ${props => (props.readOnly ? "inherit" : "992px")};
  `;
  const ToolbarContainer = styled.div`
    flex: 0 0 25%;
    overflow-y: auto;
  `;
  const CanvasContainer = styled.div`
    overflow-y: auto;
    flex: ${props => (props.readOnly ? "100%" : "75%")};
  `;

  return (
    <BaseContainer>
      <ToolbarContainer>
        <Toolbar />
      </ToolbarContainer>

      <CanvasContainer>
        <Canvas />
      </CanvasContainer>
      <PreviewButton />
    </BaseContainer>
  );
}
