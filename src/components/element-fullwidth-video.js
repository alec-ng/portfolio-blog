import React from 'react';
import img_placeholder from '../assets/blog/placeholder.jpg';
import TextOverlay from './text-overlay';

/**
 * Represents a full width video with the following specs:
 * - type: mp4
 * - auto muted and looping
 * - 16by9 aspect ratio
 * - optional text overlay
 */
export default function FullWidthVideo(props) {
  if (!props || !props.src) {
    return (<img className="width-100 img-fluid" src={img_placeholder} />);
  }
  return (
    <div className="embed-responsive embed-responsive-16by9">
      <video muted loop preload="metadata" >
        <source src={props.src} type="video/mp4"></source>
      </video>
      <TextOverlay style={props.text.style} content={props.text.content} />
    </div>
  );
}

