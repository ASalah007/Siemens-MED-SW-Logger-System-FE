import React, { useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 200,
  bgcolor: 'white',
  p: 4,

};

const GenericModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
        <div className="my-auto">
          <h1 className="font-poppins font-semibold w-[80%] text-center capitalize mx-auto">Successfully created an account, </h1>
          <h2 className="font-poppins font-semibold w-[80%] text-center capitalize mx-auto"> please verify your email</h2>
        </div>
        </Box>
      </Modal>
    </div>
  );
}

export default GenericModal;