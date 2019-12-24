import React from "react";
import { useStateValue } from "./../state";
import { ACTION_TYPES } from "./../reducers/index";
import Input from "./input";
import AttributeGroup from "./block-attribute-group";

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
  const plugin = pluginMap[focusedBlock.name];
  if (!plugin.useDefaultControls) {
    return <h1>//TODO: Rendering and value updating!</h1>;
  }

  // Selected block relies on auto generated controls
  const onInput = function(e) {
    let newVal = e.target.value;
    if (e.target.type === "checkbox") {
      newVal = e.target.checked;
    }
    if (e.target.type === "number") {
      newVal = parseFloat(e.target.value);
    }
    dispatch({
      type: ACTION_TYPES.UPDATE_FOCUSED_BLOCK,
      payload: {
        name: e.target.dataset.name,
        val: newVal,
        variation: e.target.dataset.variation
      }
    });
  };

  let baseAttrProps = {
    attrs: plugin.baseAttrs,
    isBase: true,
    onInput: onInput,
    focusedBlock: focusedBlock
  };
  let variationName = focusedBlock.variation;
  let variation = plugin.variations.find(
    variation => variation.name === variationName
  );
  let variationAttrProps = {
    attrs: variation.attrs,
    isBase: false,
    onInput: onInput,
    variationName: variationName,
    focusedBlock: focusedBlock
  };

  return (
    <form>
      <AttributeGroup {...baseAttrProps} />
      <AttributeGroup {...variationAttrProps} />
    </form>
  );
}
