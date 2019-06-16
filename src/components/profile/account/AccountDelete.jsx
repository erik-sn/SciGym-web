import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { deleteUser } from '../../../actions/user';

const AccountDelete = ({ userName, open, handleClose, deleteUser }) => {
  const [confirmationUserName, setConfirmationUsername] = useState('');
  const confirmationMatches = confirmationUserName === userName;
  const confirmDelete = () => {
    deleteUser();
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="account-delete-title">
      <DialogTitle id="account-delete-title">Delete Account Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Confirm account deletion by entering your username below
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="username"
          fullWidth
          value={confirmationUserName}
          onChange={event => setConfirmationUsername(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={confirmDelete} color="secondary" disabled={!confirmationMatches}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = state => ({
  userName: state.user.username,
});

export default connect(
  mapStateToProps,
  { deleteUser }
)(AccountDelete);
