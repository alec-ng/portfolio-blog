import React from "react";

export default function ElementSingleImage(props) {  
  return (
    <div>
      <img class="img-fluid"
           alt={props.text}
           src={props.src}>
      </img>
      <br/>
      {props.text && <p>Caption: {props.text}</p>}
    </div>
  );
  
}
