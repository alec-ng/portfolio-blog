import React from "react";
import Input from "./input";
import Select from "./select";
import TextArea from "./textarea";

/**
 * Represents a grouping of form elements to be rendered in BlockAttributes in the Toolbar
 * The groupings are either "base" or some variation
 */
export default function BlockAttributeGroup(props) {
  let attrList = [];
  props.attrs.forEach(attr => {
    let inputAttrs = { "data-name": attr.name };
    let attributeSet = props.isBase
      ? props.focusedBlock.baseAttrs
      : props.focusedBlock.variationAttrs[props.variationName];

    inputAttrs["data-variation"] = props.isBase ? "base" : props.variationName;
    inputAttrs["value"] = attributeSet[attr.name] || "";

    if (attr.element === "input") {
      if (attr.type === "checkbox" && attributeSet[attr.name] === true) {
        inputAttrs["checked"] = true;
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
    }

    if (attr.element === "textarea") {
      inputAttrs["rows"] = attr.rows;
      attrList.push(
        <TextArea
          label={attr.label}
          handleOnChange={props.onChange}
          key={attr.name}
          attributes={inputAttrs}
        />
      );
    }

    if (attr.element === "select") {
      attrList.push(
        <Select
          label={attr.label}
          onChange={props.onChange}
          key={attr.name}
          options={attr.options}
          attributes={inputAttrs}
          defaultRequired={attr.defaultRequired}
        />
      );
    }
  });
  return (
    <>
      {props.isBase
        ? attrList
        : attrList.length > 0 && (
            <>
              {" "}
              <br />
              {attrList}{" "}
            </>
          )}
    </>
  );
}
