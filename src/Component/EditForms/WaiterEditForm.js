import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import NumericField from '../Numeric';

// Edit Form

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

const EditForm = ({ onSubmit, dataFromParent }) => {

  return (
    <form onSubmit={onSubmit}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          '& > :not(style)': { m: 1 },
        }}
      >
        <TextField
          helperText="Edit Waiter Name"
          id="editingName"
          defaultValue={dataFromParent.waiter_name}
        />
      </Box>
      <Button
        style={{ 
          left: '50%',
          transform: "translate(-50%, 0)" 
        }}
        variant="outlined"
        type="submit">
        Submit
      </Button>
      <input type="hidden" id="editingId" name="editingId" 
      value={dataFromParent.waiter_id}></input>
    </form>
  );
};

const CustomerModal = ({
  onClickOutside,
  onKeyDown,
  modalRef,
  buttonRef,
  closeModal,
  onSubmit,
  dataFromParent
}) => {
  return ReactDOM.createPortal(
    <FocusTrap>
      <aside
        tag="aside"
        role="dialog"
        tabIndex="-1"
        aria-modal="true"
        className="modal-cover"
        onClick={onClickOutside}
        onKeyDown={onKeyDown}
      >
        <div className="modal-area" ref={modalRef}>
          <button
            ref={buttonRef}
            aria-label="Close Modal"
            aria-labelledby="close-modal"
            className="_modal-close"
            onClick={closeModal}
          >
            <span id="close-modal" className="_hide-visual">
              Close
            </span>
            <svg className="_modal-close-icon" viewBox="0 0 40 40">
              <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </button>
          <div className="modal-body">
            <EditForm 
            onSubmit={onSubmit}
            dataFromParent={dataFromParent}/>
          </div>
        </div>
      </aside>
    </FocusTrap>,
    document.body
  );
};


export class WaitListEditForm extends Component {
  state = { isShown: false };
  showModal = () => {
    this.setState({ isShown: true }, () => {
      this.closeButton.focus();
    });
    this.toggleScrollLock();
  };
  closeModal = () => {
    this.setState({ isShown: false });
    this.TriggerButton.focus();
    this.toggleScrollLock();
  };
  onKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  };
  onClickOutside = (event) => {
    if (this.modal && this.modal.contains(event.target)) return;
    this.closeModal();
  };

  toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
  };
  render() {
    return (
      <React.Fragment>
        <TriggerButton
          showModal={this.showModal}
          buttonRef={(n) => (this.TriggerButton = n)}
        />
        {this.state.isShown ? (
          <CustomerModal
            onSubmit={this.props.onSubmit}
            modalRef={(n) => (this.modal = n)}
            buttonRef={(n) => (this.closeButton = n)}
            closeModal={this.closeModal}
            onKeyDown={this.onKeyDown}
            onClickOutside={this.onClickOutside}
            dataFromParent={this.props.dataFromParent}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default WaitListEditForm;