# Scrapbook Editor

---

## Overview

**Dependencies**

- Bootstrap CSS

**Inspirations**

- ORY Editor / React-Page
- Dante2
- Megadraft

**Features**

- Export content as JSON
- UX based on drag and drop elements as opposed to Medium-like writing - emphasis is on media instead of text
- Editor and Read-only mode to support creating and rendering content
- Supports creation of custom widgets

## Quickstart

## Usage

## Props

|                       | Description                                                                                                            | Required                  |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| pageData              | pageMetadata, header, and blocks keys to populate default content                                                      | no                        |
| onSave                | cb that is executed when the editor is saved. receives (pageMetadata, header, blocks) arguments                        | yes IF `readOnly = false` |
| readOnly              | if false, renders in editor mode with access to toolbar and canvas. if yes, renders `pageData` and nothing else        | no, default `false`       |
| plugins               | list of plugins that are needed to be rendered with `pageData.blocks`, or plugins you want to work with in editor mode | yes                       |
| showPluginDescription | in editor mode, whether or not plugin descriptions are rendered                                                        | no, default `true`        |
| verticalBlockMargin   | Vertical margin used on all canvas block elements during preview/read-only mode                                        | no, default `20px`        |

## Documentation

- CSS helper classes found in styles.css and namespaced with "scrapbookeditor"

- [Plugins](/plugins.md)
