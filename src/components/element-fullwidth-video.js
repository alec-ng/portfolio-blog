import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

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

  let vidRef = React.createRef();
  return (
    <VisibilitySensor onChange={onChange} partialVisibility={true}>
      <div className="embed-responsive embed-responsive-16by9">
        <video muted loop preload="metadata" ref={vidRef}>
          <source src={props.src} type="video/mp4"></source>
        </video>
        <TextOverlay style={props.text.style} content={props.text.content} />
      </div>
    </VisibilitySensor>
  );

  // If video is visible, play. If not, pause
  function onChange(isVisible) {
    const VID_CHILD_INDEX = 0; // assumes video tag is first child of top level container under VisibilitySensor
    let video = this.children.props.children[VID_CHILD_INDEX].ref.current;
    if (isVisible) {
      video.play();
    } else {
      video.pause();
    }
  }
}

