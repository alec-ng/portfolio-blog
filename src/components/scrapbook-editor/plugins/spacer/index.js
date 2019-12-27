import React from "react";

const VARIATION_DEFAULT = "spacer_default";
const DEFAULT_SPACE_SIZE = 20;
const DEFAULT_SPACE_UNIT = "px";

const Spacer = {
  name: "spacer",
  label: "Spacer",
  description: "Remove or add space in between blocks",
  icon: null,
  canvasElement: SpacerElement,
  baseAttrs: [
    {
      name: "type",
      label: "Type",
      element: "select",
      defaultRequired: true,
      defaultValue: "remove",
      options: [
        {
          name: "remove",
          label: "Remove Space"
        },
        {
          name: "add",
          label: "Add Space"
        }
      ]
    },
    {
      name: "factor",
      label: "Factor",
      element: "select",
      defaultRequired: true,
      defaultValue: "1",
      options: [
        {
          name: "1",
          label: "Normal"
        },
        {
          name: "2",
          label: "Medium"
        },
        {
          name: "3",
          label: "Large"
        }
      ]
    }
  ],
  variations: [
    {
      name: VARIATION_DEFAULT,
      label: "Default Spacer",
      attrs: []
    }
  ],
  defaultVariation: VARIATION_DEFAULT,
  useDefaultControls: true
};

function SpacerElement(props) {
  if (props.baseAttrs.type === "remove") {
    return props.isEditable ? (
      <p className="text-center text-muted my-0">
        This space will not exist in read mode.
      </p>
    ) : (
      <div
        style={{ marginTop: `-${DEFAULT_SPACE_SIZE}${DEFAULT_SPACE_UNIT}` }}
      ></div>
    );
  }

  let spaceSize = parseInt(props.baseAttrs.factor) * DEFAULT_SPACE_SIZE;
  return (
    <div style={{ paddingTop: `${spaceSize}${DEFAULT_SPACE_UNIT}` }}></div>
  );
}

export default Spacer;
