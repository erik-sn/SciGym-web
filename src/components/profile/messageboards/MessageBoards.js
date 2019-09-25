import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

import MessageBoardsHead from './MessageBoardsHead';
import MessageBoardsItem from './MessageBoardsItem';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 2,
    width: '100%',
  },
});

class MessageBoards extends Component {
  render() {
    const { classes, messageboards } = this.props;
    return (
      <div className={classes.root}>
        {messageboards.length > 0 ? (
          <Card>
            <List>
              <MessageBoardsHead />
              <Divider />
              {messageboards.map(board => (
                <React.Fragment key={board.id}>
                  <MessageBoardsItem key={board.id} messageboard={board} />
                  <Divider />
                </React.Fragment>
              )
              )}
            </List>
          </Card>
        ) : (
            <div>
              <Typography variant="h4" component="h3">
                My Message Boards
              </Typography>
              <Typography variant="subtitle1" component="h6">
                You haven't openend any discussions yet!
              </Typography>
            </div>
          )
        }
      </div>
    );
  };
};

MessageBoards.propTypes = {
  classes: PropTypes.object.isRequired,
  messageboards: PropTypes.arrayOf(PropTypes.object),
  replies: PropTypes.object,
};

function mapStateToProps(state) {
  const { messageboards, num_comments } = state.messageboards;
  const { id } = state.user;
  return {
    messageboards: messageboards.filter(board => board.author.id === id),
    replies: num_comments,
  };
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(MessageBoards);
