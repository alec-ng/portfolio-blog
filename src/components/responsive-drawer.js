import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// Based off of https://github.com/mui-org/material-ui/blob/master/docs/src/pages/components/drawers/ResponsiveDrawer.js
// permanent drawer on dresktop, no header
// temporary drawer on mobile, with header + toggle button

const drawerWidth = 315;

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up("md")]: {
      height: "100%",
      marginLeft: drawerWidth
    }
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: {
    [theme.breakpoints.down("sm")]: {
      ...theme.mixins.toolbar
    }
  },
  drawerPaper: {
    width: drawerWidth
  },
  paperAnchorDockedLeft: {
    borderRight: "none"
  },
  content: {
    flexGrow: 1,
    position: "relative",
    [theme.breakpoints.up("md")]: {
      height: "100%"
    }
  }
}));

const DrawerContainer = function(props) {
  return (
    <div
      style={{
        padding: "30px 10px",
        backgroundColor: "#373a47",
        color: "rgb(184, 183, 173)",
        height: "100%"
      }}
    >
      {props.children}
    </div>
  );
};

export default function ResponsiveDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* MOBILE VIEW */}
        <Hidden mdUp implementation="css">
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
              paperAnchorDockedLeft: classes.paperAnchorDockedLeft
            }}
            ModalProps={{ keepMounted: true }} // Better open performance on mobile.
          >
            <DrawerContainer>{props.children}</DrawerContainer>
          </Drawer>
        </Hidden>

        {/* DESKTOP VIEW */}
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
              paperAnchorDockedLeft: classes.paperAnchorDockedLeft
            }}
            variant="permanent"
            open
          >
            <DrawerContainer>{props.children}</DrawerContainer>
          </Drawer>
        </Hidden>
      </nav>

      {/* CONTENT */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.content}
      </main>
    </div>
  );
}
