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
      VARIATION_STRETCH: {
        label: "Full Width",
        attrs: [] // no additional variational attributes
      }
    }
  ],
  defaultVariation: VARIATION_STRETCH,
  useDefaultControls: true
};

export default Image;
