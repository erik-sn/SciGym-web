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

import { deleteEnvironment, resetEnvironmentsProps } from '../../../actions/environments';
import { isLoading } from '../../../reducers/display';
import types from '../../../utils/types';

const styles = theme => ({
  loadingStyle: {
    marginRight: '20px',
  },
});

class DeleteEnvironment extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete = () => {
    this.props.deleteEnvironment(this.props.environment);
  };
  componentDidUpdate(prevProps) {
    if (prevProps.deleteSuccess !== this.props.deleteSuccess && this.props.deleteSuccess) {
      // this is called many times in a row because the update is not fast enough
      this.props.handleCloseDelete();
      this.props.resetEnvironmentsProps();
    }
  }

  render() {
    const { classes, openDelete, handleCloseDelete, environment, loading } = this.props;
    return (
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>
          Are you sure you want to delete the environment "{environment.name}"?
        </DialogTitle>
        <DialogActions>
          {loading ? (
            <CircularProgress
              className={classes.loadingStyle}
              size={30}
              disableShrink
              color="secondary"
            />
          ) : (
            <Button onClick={this.handleDelete} color="secondary">
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
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  deleteSuccess: state.environments.deleteSuccess,
  loading: isLoading(state.display, types.DELETE_ENVIRONMENT),
});

const mapDispatchToProps = {
  deleteEnvironment,
  resetEnvironmentsProps,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(DeleteEnvironment);
