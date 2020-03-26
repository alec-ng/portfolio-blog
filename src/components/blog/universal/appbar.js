import React from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import HideOnScroll from "../generic/hide-on-scroll";
import { makeStyles } from "@material-ui/core/styles";

/**
 * Blog app global app bar
 * Fixed, and hides on scroll
 */
export default function BlogAppBar({ openDrawer }) {
  const classes = useAppbarStyles();

  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        classes={{
          colorPrimary: classes.colorPrimary
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={openDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}

export const useAppbarSpacerStyles = makeStyles(theme => ({
  toolbar: {
    ...theme.mixins.toolbar
  }
}));

const useAppbarStyles = makeStyles(theme => ({
  colorPrimary: {
    backgroundColor: "rgb(55, 58, 71)"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "rgb(255,69,0)"
  }
}));
