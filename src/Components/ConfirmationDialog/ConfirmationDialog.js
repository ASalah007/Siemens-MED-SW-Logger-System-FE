import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";

export default function ConfirmationDialog({
  open,
  onClose,
  content,
  onConfirm,
}) {
  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="xs">
        <DialogTitle>Are you Sure !</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button onClick={onClose} autoFocus>
            Cancel
          </Button>
          <Button
            color="error"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
