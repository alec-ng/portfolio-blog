import {
  CoverPhotoElement,
  VARIATION_DEFAULT,
  VARIATION_TEXT_OVERLAY
} from "./cover-photo";

/**
 * Plugin definition for Cover Photo
 */
const CoverPhoto = {
  name: "coverPhoto",
  label: "Cover Photo",
  description: "Full width image rendered from a URL source",
  icon: null,
  canvasElement: CoverPhotoElement,
  baseAttrs: [
    {
      name: "urlSource",
      label: "URL",
      element: "input",
      type: "text"
    }
  ],
  variations: [
    {
      name: VARIATION_DEFAULT,
      label: "Base Cover Photo",
      attrs: []
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

export default CoverPhoto;
