import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

/**
 * Renders a dialogue to the user containing validation errors
 */
export function ValidationDialogue(props) {
  const errorList = props.errors.map(error => <li>{error}</li>);

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <b>Please fix the following errors</b>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <ul>{errorList}</ul>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
