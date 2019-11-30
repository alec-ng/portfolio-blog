import React, {useState, useEffect} from "react";
import { 
  useLocation, Redirect 
} from "react-router-dom";

import Enums from '../util/enums';
import ElementSingleImg from './element-single-img';
import ElementFullVideo from './element-fullwidth-video';
import SingleRow from './single-row';

/**
 * On render, parses the current URL, looks for the page to render, and 
 * renders all of its data
 */
export default function ContentRenderer(props) {
  // determine initial chosen page
  let location = useLocation();
  let pathArr = location.pathname.split('/');
  let initialPath = pathArr.length > 2 && pathArr[pathArr.length-1].toUpperCase() !== 'PHOTOGRAPHY'
    ? pathArr[pathArr.length-1]
    : '';

  // if initial path is empty, default to first available page
  let doRedirect = initialPath.length === 0;
  if (doRedirect) {
    initialPath = props.pageList[0].id;
  }

  // get data of chosen page
  // Create all element components by inspecting type property of content data
  let eleArr = [];
  let chosenPage = props.dataMap[initialPath];
  if (chosenPage) {
    chosenPage.data.forEach((ele, i) => {
      if (ele.type === Enums.ELE_FULLWIDTH_IMG) {
        eleArr.push(
          <SingleRow key={i} content={
            <ElementSingleImg src={ele.src} text={ele.text} />
          }></SingleRow>
        ); 
      } else if (ele.type === Enums.ELE_FULLWIDTH_VIDEO) {
        eleArr.push(
          <SingleRow key={i} content={
            <ElementFullVideo src={ele.src} text={ele.text} />
          }></SingleRow>
        );
      } else {
        console.log('Unknown element type: ' + ele.type);
      }  
    });
  }
  
  return (
    <section className="mt-1 mb-3">
      { /* HTML to render */
        chosenPage
          ? (
            <>
              <h1>{chosenPage.label}</h1>
              {eleArr}
            </>
          )
          : <h1>Page not found</h1>
      }
      { /* Adjust URL path to reflect initial content */
        doRedirect && <Redirect to={`/photography/${initialPath}`} />
      }
    </section>
  );
  
}
