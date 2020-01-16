import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

export default function VerticalTimelineComp(props) {
  const timelineElements = props.content.map((timelineElement, index) => (
    <VerticalTimelineElement
      contentStyle={timelineElement.contentStyleOverride || props.contentStyle}
      date={timelineElement.dateLabel}
      iconStyle={timelineElement.iconStyleOverride || props.iconStyle}
      icon={timelineElement.icon || props.icon}
      key={index}
    >
      {timelineElement.data}
    </VerticalTimelineElement>
  ));

  return <VerticalTimeline>{timelineElements}</VerticalTimeline>;
}
