import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import { deleteImage, resetImageProps } from '../../../actions/images';
import { isLoading } from '../../../reducers/display';
import types from '../../../utils/types';

const styles = theme => ({
  errorStyle: {
    margin: theme.spacing.unit,
  },
  loadingStyle: {
    marginRight: '20px',
  },
});

class DeleteImage extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete = () => {
    this.props.deleteImage(this.props.image);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.deleteSuccess !== this.props.deleteSuccess && this.props.deleteSuccess) {
      // this is called many times in a row because the update is not fast enough
      this.props.handleCloseDelete();
      this.props.resetImageProps();
    }
  }

  render() {
    const { classes, openDelete, handleCloseDelete, loading } = this.props;
    return (
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Are you sure you want to delete the image?</DialogTitle>
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

DeleteImage.propTypes = {
  handleCloseDelete: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
  openDelete: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  deleteSuccess: PropTypes.any, // this is undefined or bool
};

const mapStateToProps = state => ({
  deleteSuccess: state.images.deleteSuccess,
  loading: isLoading(state.display, types.DELETE_IMAGE),
});
const mapDispatchToProps = { deleteImage, resetImageProps };

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(DeleteImage);
