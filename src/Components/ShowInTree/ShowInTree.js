import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RFolder from "../Folder/RFolder";

function ShowInTree(props) {
  const { onClose, open, dialogTitle } = props;

  return (
    <Dialog
      onClose={() => {
        onClose();
      }}
      open={open}
      sx={{ mt: 5 }}
      className="custom-tables"
      maxWidth="lg"
    >
      <DialogTitle className="flex items-center justify-between bg-gray-100">
        {dialogTitle}
        {onClose ? (
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent className="bg-gray-100">
        <div className="p-2 min-w-[500px] min-h-screen pb-10">
          <RFolder {...props} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ShowInTree;
