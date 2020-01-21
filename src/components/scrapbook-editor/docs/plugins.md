# Plugins

The editor builds up content using **blocks**. Blocks are _instances_ of **plugins**, which are generic blueprints for editor components. Plugins can pre-define a list of **attributes** that allow users to input data for each block, which is used to dynamically render or decide content to show.

### Plugin Definition

A plugin is defined by an object and contains the following key-values:

```javascript
const myPlugin = {
  // *Required: API name of the plugin. Must be unique when loading other plugins or previously saved data
  name: "image",
  // *Required: Shown on toolbar UI
  label: "Image",
  description: "An image rendered from a URL source",
  // *Required: React element to be rendered on the canvas
  canvasElement: ImageElement,
  //  Data that is used across all variations
  baseAttrs: [
    {
      name: "urlSource",
      label: "URL",
      type: "text"
    }
  ],
  // *Required:  Different versions of the plugin. Each variation name must be unique
  variations: [
    {
      Full_Width_Variation: {
        label: "Full Width",
        attrs: []
      }
    }
  ],
  // *Required: Each plugin instance must be associated with a variation
  defaultVariation: "Full_Width_Variation"
};
```

Below is an example of how each plugin propery maps to the editor UI.

![plugin-definition-to-UI](https://i.imgur.com/uMC97KD.png)

### Variations

Plugins are intended to represent a some sort of generic element, such as an "image" or a "video". Variations are used to differentiate specific versions of the element. For example, a plugin for an Image might have the variations for a Parallax image, a full-width responsive image, a centered caption image, etc...

**Each plugin must define at least one variation, and each block will always be associated with a variation.**

Example -

```javascript
variations: [
  {
    VARIATION_DEFAULT: {
      label: "Default",
      attrs: [] ,
    }
  },
  {
    VARIATION_LARGE: {
      label: "Large Size",
      attrs: [
        {
          name: "size_percentage",
          label: "SIze (%)",
          type: "number"
        }
      ]
    }
  }
],
```

### Canvas Element

The canvasElement is a React component that represents an instance of the plugin. It has access to the following via `props` -

|                | Description                                                              | Type   |
| -------------- | ------------------------------------------------------------------------ | ------ |
| isEditable     | Whether the element is in a state that allows it to be modified          | bool   |
| variation      | API name of the plugin variation being used.                             | string |
| baseAttrs      | key/value pairings of base attribute names to their values               | {}     |
| variationAttrs | key/value pairings of variation specific attribute names to their values | {}     |

### Attributes and Controls

In order for a block to accept user input, the plugin must define at least one attribute via `baseAttrs` or in the attribute list of a variation. Attributes are defined declaratively in the plugin definition. The editor will auto-generate HTML5 for elements in the sidebar according to the element type specified.

An attribute is minimally defined by an object with the following keys:

```javascript
{
	name: 'attribute_name', // unique API name of the attribute, unique across the attribute group (base or variation)
	label: 'My Attribute',
	element: 'input' // type of form element auto generated
}
```

The following attribute elements are supported:

1. input
2. select
3. textarea

Depending on the element chosen, additional attribute properties must/may be defined.

|          | required                                                                     | optional                                                                                                                                  | notes                                                                                                                       |
| -------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| input    | `type` - any valid HTML5 input value type, such as "text", "range", "number" | -                                                                                                                                         | -                                                                                                                           |
| select   | `options` - an array of {name, label} objects representing available options | `defaultRequired` - if not defined or false, an empty option is rendered. `defaultValue` - the name of an option to be initially selected | if only one option is provided and `defaultRequired` is true, the element renders as disabled with the sole option selected |
| textarea | -                                                                            | `rows` - how many rows to render the textarea with                                                                                        | -                                                                                                                           |

Here are some examples of each element:

```javascript
{
      name: "urlSource",
      label: "URL",
      element: "input",
      type: "text"
}
```

```javascript
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
  ]
}
```

```javascript
{
      name: "source",
      label: "Source",
      element: "textarea"
	  rows: 5
}
```

Note the following:

- Base Attributes and Variation attributes can share the same name
  - (baseAttr.name1 + variationAttr.name1 is fine, as well as variation1Attr.name1 + variation2Attr.name1)

# Quickstart

The package comes shipped with a number of pre-written plugins whose source code is available to use as a template.
