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

import {
  deleteComment,
  resetCommentsProps,
} from '../../actions/comments';
import { isLoading } from '../../reducers/display';
import types from '../../utils/types';

const styles = theme => ({
  loadingStyle: {
    marginRight: '20px',
  },
});

class CommentDelete extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete = () => {
    this.props.deleteComment(this.props.comment);
  };
  componentDidUpdate(prevProps) {
    if (prevProps.deleteSuccess !== this.props.deleteSuccess && this.props.deleteSuccess) {
      // this is called many times in a row because the update is not fast enough
      this.props.handleCloseDelete();
      this.props.resetCommentsProps();
    }
  }

  render() {
    const { classes, openDelete, handleCloseDelete, loading } = this.props;
    return (
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>
          Are you sure you want to delete this comment?
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

CommentDelete.propTypes = {
  handleCloseDelete: PropTypes.func.isRequired,
  comment: PropTypes.object,
  openDelete: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  deleteSuccess: PropTypes.any, // this is either undefined or bool
};

const mapStateToProps = state => ({
  deleteSuccess: state.comments.deleteSuccess,
  loading: isLoading(state.display, types.DELETE_COMMENT),
});

const mapDispatchToProps = {
  deleteComment,
  resetCommentsProps,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(CommentDelete);
