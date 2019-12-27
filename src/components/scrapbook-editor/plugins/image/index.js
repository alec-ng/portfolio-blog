import { ImageElement, VARIATION_DEFAULT, VARIATION_CAPTION } from "./image";

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
      defaultValue: "large",
      options: [
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
    }
  ],
  defaultVariation: VARIATION_DEFAULT,
  useDefaultControls: true
};

export default Image;
