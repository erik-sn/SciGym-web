import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  createComment,
  editComment,
  resetCommentsProps,
} from '../../actions/comments';
import { getErrors } from '../../reducers/errors';
import CommentFormText from './CommentFormText';
import { isLoading } from '../../reducers/display';
import types from '../../utils/types';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  loadingStyle: {
    margin: 'auto',
    padding: '5px',
  },
});

class CommentForm extends Component {
  constructor(props) {
    super(props);
    const { comment, messageboard } = props;
    const commentExists = Boolean(comment)
    this.state = {
      commentId: commentExists ? comment.id : undefined,
      messageboardId: Boolean(messageboard) ? messageboard.id : undefined,
      commentText: commentExists ? comment.comment : '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    const commentExists = Boolean(this.props.comment);
    const { commentText, messageboardId } = this.state;
    if (this.props.quote) {
      this.props.createComment(commentText, messageboardId);
    }
    else if (commentExists) {
      const commentId = this.props.comment.id;
      this.props.editComment(commentId, commentText, messageboardId);
    } else {
      const { commentText, messageboardId } = this.state;
      this.props.createComment(commentText, messageboardId);
    };
  }

  handleChange = title => event => {
    event.preventDefault();
    this.setState({
      [title]: event.target.value,
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.uploadSuccess !== this.props.uploadSuccess && this.props.uploadSuccess) {
      // this is called many times in a row because the update is not fast enough
      this.props.onClose();
      this.props.resetCommentsProps();
    }
    if (this.state.messageboardId === undefined && this.props.messageboard) {
      this.setState({ messageboardId: this.props.messageboard.id })
    }
    if (this.state.commentId === undefined && this.props.comment) {
      this.setState({ commentId: this.props.comment.id })
    }
    if (this.props.quote && !prevProps.quote) {
      // here we add the quotation before the text the user is typing
      const { comment } = this.props
      const date = comment.created.split("T")[0]
      const preamble = '>*posted by ' + comment.author.username + ' on ' + date + '*\n\n'
      let commentText = preamble + '>' + comment.comment.replace(/\n/g, '\n>') + '  \n\n'
      while (commentText.includes('\n>\n')) {
        commentText = commentText.replace(/\n>\n/g, '\n\n')
      }
      this.setState({ commentText: commentText })
    }
    if (!this.props.quote && prevProps.quote) {
      this.setState({ commentText: this.props.comment.comment })
    }
  }

  get title() {
    if (this.props.quote) {
      return 'Reply to a Comment';
    }
    if (Boolean(this.props.comment)) {
      const title = 'Edit your Comment'
      return title;
    }
    return 'Make a Comment';
  }

  render() {
    const { classes, errors, loading } = this.props;
    return (
      <form className={classes.container}>
        <Dialog onClose={this.props.onClose} open={this.props.open} fullWidth>
          <DialogTitle>
            {this.title}
          </DialogTitle>
          <CommentFormText
            commentText={this.state.commentText}
            handleChange={this.handleChange}
            errors={errors}
          />
          {loading ? (
            <CircularProgress
              className={classes.loadingStyle}
              size={30}
              disableShrink
              color="primary"
            />
          ) : (
              <Button onClick={this.handleSubmit}>Submit</Button>
            )}
        </Dialog>
      </form>
    );
  }
}

CommentForm.propTypes = {
  createComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  resetCommentsProps: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  uploadSuccess: PropTypes.any, // this is either undefined or bool
  loading: PropTypes.bool.isRequired,
  quote: PropTypes.bool.isRequired,
  messageboard: PropTypes.object,
  comment: PropTypes.any, // this is either undefined or an object
  errors: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
};

function mapStateToProps(state) {
  const errorsCreate = getErrors(state.errors, types.CREATE_COMMENT);
  const errorsEdit = getErrors(state.errors, types.EDIT_COMMENT);
  const errors = Boolean(errorsCreate) ? errorsCreate : Boolean(errorsEdit) && errorsEdit;
  return {
    uploadSuccess: state.comments.uploadSuccess,
    loading:
      isLoading(state.display, types.CREATE_COMMENT) ||
      isLoading(state.display, types.EDIT_COMMENT),
    errors: errors,
  }
};

const mapDispatchToProps = {
  createComment,
  editComment,
  resetCommentsProps,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(CommentForm);
