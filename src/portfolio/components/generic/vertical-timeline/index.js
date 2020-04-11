import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./vertical-timeline-style.css";

export default function VerticalTimelineComp(props) {
  return (
    <VerticalTimeline className="custom-vert-timeline">
      {props.content.map((timelineElement, index) => (
        <VerticalTimelineElement
          contentStyle={
            timelineElement.contentStyleOverride || props.contentStyle
          }
          date={timelineElement.dateLabel}
          iconStyle={timelineElement.iconStyleOverride || props.iconStyle}
          icon={timelineElement.icon || props.icon}
          key={index}
        >
          {timelineElement.data}
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
}
