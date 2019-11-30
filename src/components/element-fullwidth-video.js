import React from 'react';
import img_placeholder from '../assets/blog/placeholder.jpg';

/**
 * Represents a full width video with the following specs:
 * - type: mp4
 * - auto muted and looping
 * - 16by9 aspect ratio
 * - optional text overlay
 */
const FullWidthVideo = function(props) {
  if (!props) {
    return (<img class="width-100 img-fluid" src={img_placeholder} />);
  }
  return (
    <div class="embed-responsive embed-responsive-16by9">
      <video muted class="video-js" preload="auto" loop="false">
        <source src="${props.urlsource}" type="video/mp4"></source>
      </video>
      <TextOverlay data={props.text} />
    </div>
  );
}

const TextOverlay = function(data) {
  if (!data) {
    return;
  }
  return (
    <div class="text-container" 
         style={data.style}>
      <p>{data.content}</p>
    </div>
  );
}

export default FullWidthVideo;