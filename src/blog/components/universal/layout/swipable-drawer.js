import React from "react";
import styled from "styled-components";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { makeStyles } from "@material-ui/core/styles";

/**
 * Swipeable temporary drawer, left anchored
 */
export default function StyledSwipeableDrawer({
  open,
  toggleDrawer,
  children
}) {
  const classes = useStyles();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  function onOpen() {
    toggleDrawer(true);
  }
  function onClose() {
    toggleDrawer(false);
  }

  return (
    <SwipeableDrawer
      variant="temporary"
      anchor="left"
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      ModalProps={{ keepMounted: true }} // Better open performance on mobile.
      classes={{
        paper: classes.drawerPaper,
        paperAnchorDockedLeft: classes.paperAnchorDockedLeft
      }}
    >
      <DrawerContainer>{children}</DrawerContainer>
    </SwipeableDrawer>
  );
}

// --------- STLYES

const drawerWidth = 325;

const DrawerContainer = styled.div`
  margin: 30px 0;
  color: rgb(184, 183, 173);
`;

const useStyles = makeStyles(() => ({
  drawerPaper: {
    fontSize: "1rem",
    width: drawerWidth,
    backgroundColor: "#373a47",
    "&::-webkit-scrollbar": {
      width: "3px"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgb(255, 69, 0)",
      borderRadius: "5px"
    },
    "&::-webkit-scrollbar-track": {
      opacity: "0"
    }
  },
  paperAnchorDockedLeft: {
    borderRight: "none"
  }
}));
