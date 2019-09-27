import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';

import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

import MessageBoardForm from '../../environment/MessageBoardForm';
import MessageBoardsDelete from './MessageBoardsDelete';

class MessageBoardsActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openForm: false,
      openDelete: false
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

  handleClose = () => {
    this.setState({ openForm: false, openDelete: false });
  };

  render() {
    const { messageboard } = this.props;
    const { classes } = this.props;
    const { openForm, openDelete } = this.state;
    return (
      <div>
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
        </div>
        <MessageBoardForm messageboard={messageboard} environment={messageboard.environment} open={openForm} onClose={this.handleClose} />
        <MessageBoardsDelete messageboard={this.props.messageboard} openDelete={openDelete} handleCloseDelete={this.handleClose} />
      </div>
    );
  }
};

MessageBoardsActions.propTypes = {
  classes: PropTypes.object.isRequired,
  messageboard: PropTypes.object.isRequired,
};

export default MessageBoardsActions;
