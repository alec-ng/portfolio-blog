import { ImageElement, VariationNames } from "./image";
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
      stretch: {
        label: "Full Width",
        attrs: [] // no additional variational attributes
      }
    }
  ],
  defaultVariation: "stretch"
};

export default Image;
