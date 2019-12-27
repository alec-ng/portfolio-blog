import {
  ImageElement,
  VARIATION_DEFAULT,
  VARIATION_TEXT_OVERLAY,
  VARIATION_CAPTION
} from "./image";

/**
 * Plugin definition for Image
 */
const Image = {
  name: "image",
  label: "Image",
  description: "An image rendered from a URL source",
  icon: null,
  canvasElement: ImageElement,
  baseAttrs: [
    {
      name: "urlSource",
      label: "URL",
      element: "input",
      type: "text"
    },
    {
      name: "size",
      label: "Size",
      element: "select",
      defaultRequired: true,
      defaultValue: "stretch",
      options: [
        {
          name: "stretch",
          label: "Stretch"
        },
        {
          name: "large",
          label: "Large"
        },
        {
          name: "medium",
          label: "Medium"
        },
        {
          name: "small",
          label: "Small"
        }
      ]
    }
  ],
  variations: [
    {
      name: VARIATION_DEFAULT,
      label: "Base Image",
      attrs: []
    },
    {
      name: VARIATION_CAPTION,
      label: "Captioned Image",
      attrs: [
        {
          name: "primaryText",
          label: "Primary Text",
          element: "input",
          type: "text"
        },
        {
          name: "secondaryText",
          label: "Secondary Text",
          element: "input",
          type: "text"
        }
      ]
    },
    {
      name: VARIATION_TEXT_OVERLAY,
      label: "Text Overlay",
      attrs: [
        {
          name: "text",
          label: "Caption",
          element: "input",
          type: "text"
        },
        {
          name: "align",
          label: "Text Alignment",
          element: "select",
          defaultRequired: true,
          defaultValue: "left",
          options: [
            {
              name: "left",
              label: "Left"
            },
            {
              name: "center",
              label: "Center"
            },
            {
              name: "right",
              label: "Right"
            }
          ]
        },
        {
          name: "top",
          label: "Top - Absolute Position",
          element: "input",
          type: "text"
        },
        {
          name: "right",
          label: "Right - Absolute Position",
          element: "input",
          type: "text"
        },
        {
          name: "bottom",
          label: "Bottom - Absolute Position",
          element: "input",
          type: "text"
        },
        {
          name: "left",
          label: "Left - Absolute Position",
          element: "input",
          type: "text"
        }
      ]
    }
  ],
  defaultVariation: VARIATION_DEFAULT,
  useDefaultControls: true
};

export default Image;
