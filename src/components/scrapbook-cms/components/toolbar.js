import React from "react";
import PageMetadata from "./page-metadata";
import TreeView from "./treeview";
import { slide as Menu } from "react-burger-menu";

/**
 * Menu sidebar with two sections controlled through a button-group
 * 1. shows all pages loaded in a treeview
 * 2. if a page is chosen, shows its metadata<Menu>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>
        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
 */
export default function Toolbar(props) {
  const onSave = function() {
    props.onSave();
    // props.onSave should accept a cb that, when run, will let us know if the
    // updates were successful. if yes, then clear the change list
  };

  const onPostSelect = function(e) {
    // update chosenPost with selection
    let postId = e.currentTarget.dataset.postId;
    // check if current postData is same as one passed in to plugin initially
  };

  const onPostCreate = function(e) {
    // open modal or section with required title, date,
    // validation -- title should be unique across all posts
    // on successful validation - mutateHistory()
  };

  const onPostDelete = function(e) {
    // "Are you sure" confirmation?
    // on "yes" - mutateHistory()
  };

  const showSettings = function(e, f) {
    console.log(e);
    console.log(f);
  };

  let styles = {
    bmBurgerButton: {
      position: "fixed",
      width: "35px",
      height: "30px",
      right: "25px",
      top: "25px"
    },
    bmBurgerBars: {
      background: "#373a47"
    },
    bmBurgerBarsHover: {
      background: "#a90000"
    },
    bmCrossButton: {
      height: "24px",
      width: "24px"
    },
    bmCross: {
      background: "#bdc3c7"
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%"
    },
    bmMenu: {
      background: "#373a47",
      padding: "2.5em 1.5em 0",
      fontSize: "1.15em"
    },
    bmMorphShape: {
      fill: "#373a47"
    },
    bmItemList: {
      color: "#b8b7ad",
      padding: "0.8em"
    },
    bmItem: {
      display: "inline-block"
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)"
    }
  };

  return (
    <Menu styles={styles} right isOpen>
      <TreeView />
    </Menu>
  );
}
