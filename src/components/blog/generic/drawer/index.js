import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import { useTheme } from "@material-ui/core/styles";
import { DrawerContainer, useStyles } from "./styles";

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Drawer(props) {
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />

      <HideOnScroll>
        <AppBar
          position="fixed"
          classes={{
            colorPrimary: classes.colorPrimary,
            root: classes.appBar
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

      <SwipeableDrawer
        variant="temporary"
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={open}
        onOpen={openDrawer}
        onClose={closeDrawer}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        classes={{
          paper: classes.drawerPaper,
          paperAnchorDockedLeft: classes.paperAnchorDockedLeft
        }}
      >
        <DrawerContainer>{props.children}</DrawerContainer>
      </SwipeableDrawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.content}
      </main>
    </>
  );
}
