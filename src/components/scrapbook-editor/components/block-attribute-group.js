import React from "react";
import Input from "./input";

/**
 * Represents a grouping of inputs to be rendered in BlockAttributes in the Toolbar
 * The groupings are either "base" or some variation
 */
export default function BlockAttributeGroup(props) {
  let attrList = [];
  props.attrs.forEach(attr => {
    let inputAttrs = {
      "data-name": attr.name
    };
    if (props.isBase) {
      inputAttrs["data-variation"] = "base";
      inputAttrs["value"] = props.focusedBlock.baseAttrs[attr.name] || "";
      inputAttrs["checked"] = props.focusedBlock.baseAttrs[attr.name] === true;
    } else {
      inputAttrs["data-variation"] = props.variationName;
      inputAttrs["value"] =
        props.focusedBlock.variationAttrs[props.variationName][attr.name] || "";
      inputAttrs["checked"] =
        props.focusedBlock.variationAttrs[props.variationName][attr.name] ===
        true;
    }

    attrList.push(
      <Input
        label={attr.label}
        type={attr.type}
        handleOnChange={props.onChange}
        key={attr.name}
        attributes={inputAttrs}
      />
    );
  });
  return (
    <>
      {props.isBase
        ? attrList
        : attrList.length > 0 && (
            <>
              {" "}
              <hr /> {attrList}{" "}
            </>
          )}
    </>
  );
}
