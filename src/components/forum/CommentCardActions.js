import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';

import CommentForm from './CommentForm';
import CommentDelete from './CommentDelete';

class CommentCardActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openForm: false,
      openDelete: false,
      quote: false
    };
  }

  handleClickOpen = () => {
    const newStateOpen = !this.state.openForm;
    this.setState({
      openForm: newStateOpen,
    });
  };

  handleClickDelete = () => {
    const newStateOpen = !this.state.openDelete;
    this.setState({
      openDelete: newStateOpen,
    });
  };

  handleClickQuote = () => {
    const newStateOpen = !this.state.openDelete;
    this.setState({
      quote: true,
      openForm: newStateOpen,
    });
  };

  handleClose = () => {
    this.setState({ openForm: false, openDelete: false, quote: false });
  };

  render() {
    const { board } = this.props.comment;
    const { classes, owner } = this.props;
    const { openForm, openDelete } = this.state;
    return (
      <div className={classes.buttonPosition}>
        {owner ? (
          <div>
            <Fab
              size="small"
              color="secondary"
              onClick={this.handleClickDelete}
              className={classes.buttonStyle}
            >
              <Delete />
            </Fab>
            <Fab
              size="small"
              color="primary"
              onClick={this.handleClickOpen}
              className={classes.buttonStyle}
            >
              <Edit />
            </Fab>
            <IconButton onClick={this.handleClickQuote} className={classes.buttonStyle}>
              <FormatQuoteIcon />
            </IconButton>
          </div>
        ) : (
            <IconButton onClick={this.handleClickQuote} className={classes.buttonStyle}>
              <FormatQuoteIcon />
            </IconButton>
          )}
        <CommentForm
          messageboard={board}
          comment={this.props.comment}
          quote={this.state.quote}
          open={openForm}
          onClose={this.handleClose}
        />
        <CommentDelete
          comment={this.props.comment}
          openDelete={openDelete}
          handleCloseDelete={this.handleClose}
        />
      </div>
    );
  }
};

CommentCardActions.propTypes = {
  classes: PropTypes.object.isRequired,
  owner: PropTypes.bool.isRequired,
  comment: PropTypes.object.isRequired,
};

export default CommentCardActions;
