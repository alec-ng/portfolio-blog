import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/**
 * Represents a plugin shown in the toolbar that can be dragged and dropped
 * onto the canvas
 */
export default function DraggablePlugin(props) {
  // dataTransfer the the name of the plugin
  function onDragStart(e) {
    e.dataTransfer.setData("pluginName", props.plugin.name);
  }

  return (
    <Row draggable="true" onDragStart={onDragStart}>
      <Col md={4}>{props.plugin.icon}</Col>
      <Col md={8}>
        <h3>{props.plugin.label}</h3>
        <p>{props.plugin.description}</p>
      </Col>
    </Row>
  );
}
