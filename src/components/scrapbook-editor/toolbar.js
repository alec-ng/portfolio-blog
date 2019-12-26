import React from "react";
import { useStateValue } from "./state";
import { PageMetadataControls } from "./components/page-metadata";
import { ACTION_TYPES } from "./reducers/index";
import DraggablePlugin from "./components/draggable-plugin";
import Accordion from "./components/accordion";
import BlockAttributes from "./components/block-attributes";
import PreviewButton from "./components/preview-button";

/**
 * Represents the editor's command bar for modifying page and block metadata
 */
export default function Toolbar(props) {
  const [{ plugins, pageMetadata, blocks, onSave }, dispatch] = useStateValue();

  const PluginList = plugins.map(plugin => (
    <DraggablePlugin key={plugin.name} plugin={plugin}></DraggablePlugin>
  ));

  function exportEditorData(e) {
    alert("Data exported - check console.");
    // Update last-updated date
    let nowStr = new Date().toISOString();
    dispatch({
      type: ACTION_TYPES.UPDATE_INPUT,
      payload: {
        inputKey: "lastModified",
        value: nowStr
      }
    });
    let localPageMetadata = Object.assign({}, pageMetadata, {
      lastModified: nowStr
    });
    onSave(localPageMetadata, blocks);
  }

  function initPreview(e) {
    alert("TODO!");
  }

  return (
    <div style={{ minHeight: "100%" }}>
      <section className="p-1">
        <Accordion title="Page Metadata">
          <PageMetadataControls />
        </Accordion>
        <Accordion title="Add Block">{PluginList}</Accordion>
        <Accordion title="Block Attributes" openOnDefault={true}>
          <BlockAttributes />
        </Accordion>
      </section>
      <section className="p-3">
        <button
          type="button"
          className="btn btn-block btn-success"
          onClick={exportEditorData}
        >
          Save
        </button>
        <PreviewButton />
      </section>
    </div>
  );
}
