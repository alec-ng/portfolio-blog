import React from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HideOnScroll from "../../generic/hide-on-scroll";
import { makeStyles } from "@material-ui/core/styles";

/**
 * Blog app global app bar
 * Fixed, and hides on scroll
 */
function BlogAppBar({ toggleDrawer }) {
  function onIconClick() {
    toggleDrawer(true);
  }

  const classes = useAppbarStyles();

  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        classes={{
          root: classes.root,
          colorPrimary: classes.colorPrimary
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onIconClick}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
      </AppBar>
    </HideOnScroll>
  );
}

// Direct child of app.js, prevent rerender on context update
export default React.memo(BlogAppBar);

// ------------- STYLES

export const appbarHeight = "55px";

const useAppbarStyles = makeStyles(() => ({
  root: {
    height: appbarHeight,
    display: "flex",
    flexDirection: "row",
    padding: "7px 25px"
  },
  colorPrimary: {
    backgroundColor: "rgb(55, 58, 71)"
  },
  menuButton: {
    marginRight: "10px",
    color: "rgb(255,69,0)"
  }
}));
