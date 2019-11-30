import React from "react";
import img_placeholder from '../assets/blog/placeholder.jpg';
import TextOverlay from './text-overlay';
import styled from 'styled-components';

export default function ElementSingleImage(props) {  
  if (!props || !props.text) {
    return (<img class="width-100 img-fluid" src={img_placeholder} />);
  }
  return (
    <>
      <img className="img-fluid width-100"
           alt={props.text}
           src={props.src}>
      </img>
      {
        props.text
          ? <TextOverlay style={props.text.style} content={props.text.content}></TextOverlay>
          : null
      }
    </>
  );  
}

