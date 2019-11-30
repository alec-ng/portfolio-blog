import React from "react";
import img_placeholder from '../assets/blog/placeholder.jpg';
import TextOverlay from './text-overlay';
import styled from 'styled-components';

export default function ElementSingleImage(props) {  
  if (!props) {
    return (<img class="width-100 img-fluid" src={img_placeholder} />);
  }
  return (
    <div>
      <img className="img-fluid width-100"
           alt={props.text}
           src={props.src}>
      </img>
      
      <br/>
      {
        props.text
          ? <TextOverlay style={props.text.style} content={props.text.content}></TextOverlay>
          : null
      }
    </div>
  );  
}

