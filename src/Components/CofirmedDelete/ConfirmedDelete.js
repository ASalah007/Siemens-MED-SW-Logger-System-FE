import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function ConfirmedDelete({
  title,
  content,
  onYes,
  onNo,
  open,
onClick,
onClose
}) {
  return (
    <>
      <IconButton onClick={onClick}>
        <DeleteOutlineIcon color="error" />
      </IconButton>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button onClick={() => onYes()} color="error">
            Delete
          </Button>
          <Button onClick={() => onNo()} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
