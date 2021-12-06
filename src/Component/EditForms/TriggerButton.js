import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const TriggerButton = ({ buttonRef, showModal }) => {
  return (
    <Tooltip title="Edit">
      <IconButton
        className="btn btn-lg btn-danger center modal-button"
        ref={buttonRef}
        onClick={showModal}>
        <EditIcon />
      </IconButton>
    </Tooltip>

  );
};
export default TriggerButton;