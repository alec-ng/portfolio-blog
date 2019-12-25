import { ImageElement } from "./image";
import { VARIATION_STRETCH } from "./variation-stretch";
// TOOD: some sort of icon

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
      type: "text"
      // could also add validation rules here
    }
  ],
  variations: [
    {
      name: VARIATION_STRETCH,
      label: "Full Width",
      attrs: [
        {
          name: "testAttr",
          label: "TestAttribute",
          type: "checkbox"
          // could also add validation rules here
        },
        {
          name: "testAttr2",
          label: "TestAttribute2",
          type: "date"
          // could also add validation rules here
        },
        {
          name: "testAttr3",
          label: "TestAttribute3",
          type: "number"
          // could also add validation rules here
        }
      ]
    }
  ],
  defaultVariation: VARIATION_STRETCH,
  useDefaultControls: true
};

export default Image;
