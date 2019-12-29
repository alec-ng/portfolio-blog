import React from "react";
import { useStateValue } from "./state";
import { PageHeaderControls } from "./components/page-header";
import { ACTION_TYPES } from "./reducers/index";
import DraggablePlugin from "./components/draggable-plugin";
import Accordion from "./components/accordion";
import BlockAttributes from "./components/block-attributes";
import PreviewButton from "./components/preview-button";

/**
 * Represents the editor's left hand command bar for modifying page and block metadata
 */
export default function Toolbar(props) {
  const [
    {
      plugins,
      pageMetadata,
      blocks,
      onSave,
      focusedBlock,
      showPluginDescription,
      header
    },
    dispatch
  ] = useStateValue();

  /**
   * On button click,
   * // TODO: block validation
   * updates the last modified timestamp on page metadata
   * executes the onSave cb with the page metadata and block information passed as args
   */
  function exportEditorData(e) {
    let nowStr = new Date().toISOString();
    dispatch({
      type: ACTION_TYPES.UPDATE_PAGE_METADATA,
      payload: {
        key: "lastModified",
        value: nowStr
      }
    });
    let localPageMetadata = Object.assign({}, pageMetadata, {
      lastModified: nowStr
    });
    onSave(localPageMetadata, header, blocks);
  }

  /**
   * On button click,
   * Remove focused block from global state
   */
  function deleteFocusedBlock(e) {
    dispatch({
      type: ACTION_TYPES.DELETE_FOCUSED_BLOCK
    });
  }

  /**
   * Render all plugins passed into scrapbook-editor as draggable onto the canvas
   */
  const PluginList = plugins.map(plugin => (
    <DraggablePlugin
      showPluginDescription={showPluginDescription}
      key={plugin.name}
      plugin={plugin}
    />
  ));

  return (
    <div style={{ minHeight: "100%" }}>
      <section className="p-1">
        <Accordion title="Page Header">
          <PageHeaderControls />
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
        {focusedBlock != null && (
          <button
            type="button"
            className="btn btn-block btn-danger"
            onClick={deleteFocusedBlock}
          >
            Delete Current Block
          </button>
        )}
      </section>
    </div>
  );
}
