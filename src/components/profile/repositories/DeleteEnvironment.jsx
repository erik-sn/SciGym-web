import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  errorStyle: {
    margin: theme.spacing.unit,
  },
});

class DeleteEnvironment extends Component {
  render() {
    const { classes, openDelete, handleCloseDelete, error, handleDelete, environment } = this.props;
    return (
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>
          Are you sure you want to delete the environment "{environment.name}"?
          {error ? (
            <Typography color="error" className={classes.errorStyle}>
              {error}
            </Typography>
          ) : null}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DeleteEnvironment.propTypes = {
  handleCloseDelete: PropTypes.func.isRequired,
  environment: PropTypes.object,
  openDelete: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default withStyles(styles)(DeleteEnvironment);
