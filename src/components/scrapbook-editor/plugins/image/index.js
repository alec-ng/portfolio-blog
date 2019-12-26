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
      element: "input",
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
          element: "input",
          type: "checkbox"
        },
        {
          name: "testAttr2",
          label: "TestAttribute2",
          element: "input",
          type: "date"
        },
        {
          name: "testAttr3",
          label: "TestAttribute3",
          element: "input",
          type: "number"
        },
        {
          name: "testAttr4",
          label: "TestAttribute4",
          element: "input",
          type: "text"
        },
        {
          name: "testAttr5",
          label: "TestAttribute5",
          element: "select",
          defaultRequired: false,
          options: [
            {
              label: "Label 1",
              name: "label1"
            },
            {
              label: "Label 2",
              name: "label2"
            }
          ]
        }
      ]
    }
  ],
  defaultVariation: VARIATION_STRETCH,
  useDefaultControls: true
};

export default Image;
