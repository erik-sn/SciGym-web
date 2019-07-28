import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import types from '../../../utils/types';
import { isLoading } from '../../../reducers/display';

const styles = theme => ({});

class DeleteEnvironment extends Component {
  render() {
    const { openDelete, handleCloseDelete, handleDelete, environment, loading } = this.props;
    const open = loading ? true : openDelete;
    return (
      <Dialog open={open} onClose={handleCloseDelete}>
        <DialogTitle>
          Are you sure you want to delete the environment "{environment.name}"?
        </DialogTitle>
        <DialogActions>
          {loading ? (
            <CircularProgress size={30} disableShrink color="secondary" />
          ) : (
            <Button onClick={handleDelete} color="secondary">
              Delete
            </Button>
          )}
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
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: isLoading(state.display, types.DELETE_ENVIRONMENT),
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(DeleteEnvironment);
