import React from "react";

import ElementSingleImg from './element-single-img';

export default function ContentRenderer(props) {
  let elementList = [];
  let title = props.contentData.label;

  // Create all element components by inspecting type property of content data
  let eleArr = [];
  props.contentData.data.forEach((ele) => {
    if (ele.type === 'FULL_WIDTH_IMG') {
      eleArr.push(
        <ElementSingleImg src={ele.src}
                          text={ele.text} />
      ); 
    } else {
      console.log('Unknown element type: ' + ele.type);
    }  
  });
  
  return (
    <section>
      <h1>{props.contentData.label}</h1>
      <div>
        {eleArr}
      </div>
    </section>
  );
  
}
