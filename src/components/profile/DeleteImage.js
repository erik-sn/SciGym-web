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

class DeleteImage extends Component {
  render() {
    const { classes, openDelete, handleCloseDelete, error, handleDelete, image } = this.props;
    return (
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>
          Are you sure you want to delete the image?
          {error ? (
            <Typography color="error" className={classes.errorStyle}>
              {'error'}
            </Typography>
          ) : null}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => handleDelete(image)} color="secondary">
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

DeleteImage.propTypes = {
  handleCloseDelete: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
  openDelete: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default withStyles(styles)(DeleteImage);
