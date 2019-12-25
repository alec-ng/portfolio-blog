import React from "react";
import { useStateValue } from "./../state";
import { ACTION_TYPES } from "./../reducers/index";
import Select from "./select";

/**
 * Renders a select option that toggles the variation of the currently focused block
 */
export default function VariationSelect(props) {
  const [{ focusedBlock, pluginMap }, dispatch] = useStateValue();

  function onSelectChange(e) {
    let newVariation = e.target.value;
    if (focusedBlock.variation === newVariation) {
      return;
    }
    dispatch({
      type: ACTION_TYPES.UPDATE_VARIATION,
      payload: {
        variation: newVariation
      }
    });
  }

  // Generate options for each variation of focused block type, with selected option being
  // current variation being used
  let currPlugin = pluginMap[focusedBlock.name];
  const optionsList = currPlugin.variations.map(variation => (
    <option key={variation.name} value={variation.name}>
      {variation.label}
    </option>
  ));
  let attributes = {
    value: focusedBlock.variation
  };

  return (
    <Select
      multiple={false}
      attributes={attributes}
      label="Variation"
      onChange={onSelectChange}
      options={optionsList}
    />
  );
}
