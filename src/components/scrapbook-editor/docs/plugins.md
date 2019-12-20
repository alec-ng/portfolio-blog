# Plugins

---

## Terminology

- The Scrapbook Editor is used to create **pages**. As an analogy, a blog consists of blog posts the same way that a Scrapbook can consist of **pages**.
- Pages are built up of one or more **blocks**. Blocks are customizable media that build up the page's contents.
- A block is an instance of a **plugin** that contains user input. These inputs are stored in **attributes**.

## What is a plugin?

Plugins are a blueprint for any sort of element that can exist on a page. Typically, this element is a high level of abstraction, such as an image or a video. Scrapbook Editor comes with a set of default plugins that accommodate traditional elements found on most online writing. These include plugins and variations to represent images, video, and text.

### Attributes

### Variations

Since plugins are meant to represent a some sort of generic element, variations are used to specific versions of the element. For example, a plugin for an Image might have the variations for a Parallax image, a full-width responsive image, a centered caption image, etc...

Each plugin must have at least variation, and each instance of a plugin must be associated with a variation.

### Capturing Attribute Data

### Plugin Definition

Each plugin contains must contain a definition that takes the following form:

```javascript
// API name of the plugin. Must be unique when loading other plugins or previously saved data
name: "image",
// label, description, icon shown on toolbar UI
label: "Image",
description: "An image rendered from a URL source",
icon: null,
// React element to be rendered on the canvas
canvasElement: ImageElement,
// Plugin data that is used across all variations
baseAttrs: [
  {
    name: "urlSource",
    label: "URL",
    type: "text" // HTML5 input if using auto generated inputs
  }
],
// Different versions of the plugin. Each variation name must be unique
variations: [
  {
    VARIATION_STRETCH: {
      label: "Full Width",
      attrs: [] // no additional variational attributes
    }
  }
],
// Each plugin instance must be associated with a variation
defaultVariation: VARIATION_STRETCH,
// If true, Scrapbook Editor will use auto-generated HTML5 inputs to fill in attribute data
useDefaultControls: true
// if useDefaultControls = false, this is a React element used to fill in attribute data
customControls: null
```

**TODO: Link example in repo**

## How do I load plugins?

```javascript
import React from "react";
import { withAuthorization } from "../components/session";
import { ScrapbookEditor } from "../components/scrapbook-editor/scrapbook-editor";

// LOAD YOUR PLUGIN DEFINITIONS
import Image from "../components/scrapbook-editor/plugins/image/index";

export default function YourComponent = function(props) {
  // Create an array with all the plugins you've imported.
  // The order defined is the order shown in the toolbar
  const plugins = [Image];

  return (
      <ScrapbookEditor plugins={plugins}
      />
  );
};
```
