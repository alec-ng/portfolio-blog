import React from "react";
import { useStateValue } from "./../state";
import { ACTION_TYPES } from "./../reducers/index";
import Input from "./input";

/**
 * Set of inputs that matches the attributes of the focused block on the canvas
 *
 * If the focusedBlock is of a type that has useDefaultControls=true, then
 * this component auto generates HTML5 inputs based on each attribute's type
 *
 * If the focusedBlock uses custom controls, then that will be rendered. The
 * custom control should have change handlers defined, which will be passed in
 * to the custom controls through this component.
 */
export default function BlockAttributes(props) {
  const [{ focusedBlock, pluginMap }, dispatch] = useStateValue();
  // Base case: no block is selected
  if (!focusedBlock) {
    return <></>;
  }

  // Selected block has defined its own controls
  if (focusedBlock.useDefaultControls) {
    // TODO: implement with doing custom controls
    return <h1>TODO!</h1>;
  }

  // Selected block relies on auto generated controls
  const onInput = function(e) {
    dispatch({
      type: ACTION_TYPES.UPDATE_FOCUSED_BLOCK,
      payload: {
        name: e.target.dataset.name,
        val: e.target.value,
        variation: e.target.dataset.variation
      }
    });
  };

  const plugin = pluginMap[focusedBlock.name];

  // Render base attributes
  let baseAttrList = [];
  plugin.baseAttrs.forEach(attr => {
    let inputAttrs = {
      "data-name": attr.name,
      "data-variation": "base",
      value: focusedBlock.baseAttrs[attr.name] || ""
    };
    baseAttrList.push(
      <Input
        label={attr.label}
        type={attr.type}
        handleOnInput={onInput}
        key={attr.name}
        attributes={inputAttrs}
      />
    );
  });

  // Render variation attributes
  let variationAttrList = [];
  let variationName = focusedBlock.variation;
  let variation = plugin.variations.find(
    variation => variation.name === variationName
  );
  variation.attrs.forEach(attr => {
    let inputAttrs = {
      "data-name": attr.name,
      "data-variation": variationName,
      value: focusedBlock.variationAttrs[attr.name] || ""
    };
    variationAttrList.push(
      <Input
        label={attr.label}
        type={attr.type}
        handleOnInput={onInput}
        attributes={inputAttrs}
        key={attr.name}
      />
    );
  });

  return (
    <form>
      {baseAttrList}
      {variationAttrList.length > 0 && (
        <>
          <hr />
          {variationAttrList}
        </>
      )}
    </form>
  );
}
