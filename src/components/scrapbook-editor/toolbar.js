import React from "react";
import { useStateValue } from "./state";
import { PageMetadataControls } from "./components/page-metadata";
import DraggablePlugin from "./components/draggable-plugin";
import Accordion from "./components/accordion";
/**
 * Represents the editor's command bar for modifying page and block metadata
 */
export default function Toolbar(props) {
  const [{ plugins }, dispatch] = useStateValue();

  const PluginList = plugins.map(plugin => (
    <DraggablePlugin key={plugin.name} plugin={plugin}></DraggablePlugin>
  ));

  return (
    <div style={{ height: "100%", border: "1px solid black" }}>
      <h1>This is my toolbar.</h1>
      <Accordion title="Page Metadata">
        <PageMetadataControls />
      </Accordion>
      <Accordion title="Add Block">{PluginList}</Accordion>
      <Accordion title="Block Attributes">
        <h1>TODO</h1>
      </Accordion>
      <hr />
      <button type="button">Save</button>
    </div>
  );
}
