import React from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";

/**
 * Responsive dialog component
 * Full screen on mobile, max width 'md' otherwise
 */
export default function MaxWidthDialog({ open, handleClose, children }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Dialog
      fullWidth={true}
      fullScreen={fullScreen}
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      {children}
    </Dialog>
  );
}
