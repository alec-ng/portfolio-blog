import React from "react";
import { 
  useLocation, Redirect 
} from "react-router-dom";

import ElementSingleImg from './element-single-img';

/**
 * On render, parses the current URL, looks for the page to render, and 
 * renders all of its data
 * 
 * @param props.data
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
    chosenPage.data.forEach((ele) => {
      if (ele.type === 'FULL_WIDTH_IMG') {
        eleArr.push(
          <ElementSingleImg src={ele.src}
                            text={ele.text} />
        ); 
      } else {
        console.log('Unknown element type: ' + ele.type);
      }  
    });
  }
  
  return (
    <section>
      {
        chosenPage
          ? (
            <div>
              <h1>{chosenPage.label}</h1>
              {eleArr}
            </div>
          )
          : <h1>Page not found</h1>
      }
      {
        doRedirect && <Redirect to={`/photography/${initialPath}`} />
      }
    </section>
  );
  
}
