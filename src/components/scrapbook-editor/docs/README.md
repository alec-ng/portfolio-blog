# react-block-content-editor

A WYSIWYG-like editor for creating blogging content. Try it out on [codesandbox](https://codesandbox.io/s/react-block-content-editor-ld0lq), or see a [live sample](www.alecng.ca) of some content produced and rendered with this editor.

- drag and drop UX
- easily extensible plugin architecture
- content represented as JSON
- read-only mode

![react-block-content-editor overview](https://github.com/alec-ng/react-repo/blob/master/src/components/scrapbook-editor/docs/features.gif)

### Quickstart

`npm install --save react-block-content-editor`

```javascript
import "react-block-content-editor/styles.css";
import Editor from 'react-block-content-editor';

// Import whatever plugins you want to work with or show
import Image from "react-block-content-editor/plugins/image/index";
import Markdown from "react-block-content-editor/plugins/markdown/index";
import CoverPhoto from "react-block-content-editor/plugins/cover-photo/index";
import Spacer from "react-block-content-editor/plugins/spacer/index";
import Carousel from "react-block-content-editor/plugins/carousel/index";
import Video from "react-block-content-editor/plugins/video/index";

import React from 'react';

const plugins = [Image, Markdown, CoverPhoto, Spacer, Carousel, Video];

export default function BlockEditor(props) {
	function onEditorChange(header, blocks) {
		// do something witih the most up to date data
	}

	return (
		<ScrapbookEditor
			plugins={plugins}
			onChange={onEditorChange}
		/>
);

```

### Creating Your Own Plugins

See the documentation on [plugins](/plugins.md) for more details.

### API

---

| name                  | description                                                                                          | type                       | required                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------- | ----------------------------------------------- |
| pageData              | default editor data loaded                                                                           | {header, blocks}           |                                                 |
| onSave                | renders a save button on the toolbar that, when clicked, executes this callback with the editor data | function({header, blocks}) | One of onSave or onChange if `readOnly = false` |
| onChange              | fires on every change                                                                                | function(header,blocks){}  | One of onSave or onChange if `readOnly = false` |
| readOnly              | if true, applies read-only styles to content and does not render the toolbar or editing canvas       | boolean                    | default `false`                                 |
| plugins               | list of plugins you want to work with in editor mode or need to render according to `pageData`       | []                         | yes                                             |
| showPluginDescription | show descriptive text beside plugins in editor mode                                                  | boolean                    | default `true`                                  |
| verticalBlockMargin   | y-axis margin used on all canvas block elements during read only mode                                | text                       | default `'20px'`                                |

### Roadmap

- Remove depedency on bootstrap-react
- Implement native HTML5 form validation on attributes
- Support all HTML5 input attributes in attribute definitions, such as "min", "max", etc
