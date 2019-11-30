import React from 'react';
import styled from 'styled-components';

/**
 * Absolute positioned div containing text, to be overlayed on element-fullwidth-video
 * or element-single-img
 * 
 * props.styles dictates positioning of text
 * props.content dictates the text to be rendered
 */
export default function TextOverlay(props) {
  if (!props) {
    return;
  }

  // Apply prop specific styles
  const Container = styled.div(props.style); 
  // Apply standard static styles
  const TextContainer = styled(Container)` 
    position: absolute;
    margin: 10px;
    color: #FFFFFF;
    font-size: 20px;
  `;

  return (
    <TextContainer>{props.content}</TextContainer>
  );
}