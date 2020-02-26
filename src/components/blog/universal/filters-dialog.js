import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "../generic/dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

export const StyledHr = styled.hr`
  border-color: rgba(0, 0, 0, 0.87);
  margin-top: 0;
`;

const useStyles = makeStyles(() => ({
  containedPrimary: {
    backgroundColor: "rgba(255,69,0,1)",
    "&:hover": {
      backgroundColor: "rgba(255,69,0,0.8)"
    }
  },
  dialogActionsRoot: {
    padding: "15px"
  }
}));

/**
 * Responsive dialog with form for users to choose filters to filter posts
 */
export default function FiltersDialog({
  children,
  handleSave,
  handleClose,
  open
}) {
  const classes = useStyles();
  return (
    <Dialog open={open} handleClose={handleClose}>
      <DialogContent>{children}</DialogContent>
      <DialogActions classes={{ root: classes.dialogActionsRoot }}>
        <Button variant="contained" onClick={handleClose} color="default">
          Close
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          color="primary"
          classes={{ containedPrimary: classes.containedPrimary }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
