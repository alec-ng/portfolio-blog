import React from "react";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";

/*
 * https://material-ui.com/components/app-bar/#back-to-top
 */
export default function ScrollTop({ anchorRef }) {
  const classes = useStyles();
  const trigger = useScrollTrigger();
  const handleClick = () => {
    anchorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        <Fab
          color="primary"
          size="small"
          classes={{ primary: classes.fab }}
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </Zoom>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  fab: {
    backgroundColor: "rgb(234, 90, 79)",
    "&:hover": {
      backgroundColor: "rgba(234, 90, 79, 0.75)"
    }
  }
}));
