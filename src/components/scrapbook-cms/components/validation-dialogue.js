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
      <DialogTitle id="alert-dialog-title">Error</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {errorList}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export const ValidationMessages = {
  EMPTY_CONTENT: `Your post must have at least one block to show. 
    Drag and drop a plugin on the editor canvas.`,
  EMPTY_HEADER: `A title is required. Provide a title under the "Page Header" section.`,
  UNIQUE_KEY: `The title/date combination you provided already exists. Please provide either 
    a different date or title.`
};
