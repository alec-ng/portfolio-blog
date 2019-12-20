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
    // TODO
    return <h1>TODO!</h1>;
  }

  // Selected block relies on auto generated controls
  const onInput = function(e) {
    dispatch({
      type: ACTION_TYPES.UPDATE_FOCUSED_BLOCK,
      payload: {
        name: e.target.dataset.key,
        val: e.target.value
      }
    });
  };

  const plugin = pluginMap[focusedBlock.name];
  let inputList = [];
  plugin.baseAttrs.forEach(attr => {
    inputList.push(
      <Input
        label={attr.label}
        type={attr.type}
        handleOnInput={onInput}
        dataKey={attr.name}
        key={attr.name}
      />
    );
  });

  return <form>{inputList}</form>;
}
