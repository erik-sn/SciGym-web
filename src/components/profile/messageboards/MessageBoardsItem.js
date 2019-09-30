import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import Chip from '@material-ui/core/Chip';

import MessageBoardsActions from './MessageBoardsActions';

const styles = theme => ({
  root: {
    flex: '1',
  },
  tagStyle: {
    margin: theme.spacing.unit * 0.2,
    [theme.breakpoints.down('xs')]: {
      margin: '0',
    },
  },
  buttonStyle: {
    margin: theme.spacing.unit * 0.2,
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing.unit * 0.1,
    },
  }
});

class MessageBoardItem extends Component {
  render() {
    const { classes, messageboard } = this.props;
    const { tags, titleUrl, environment } = messageboard
    return (
      <Grid container className={classes.root}>
        <Grid item sm={7} xs={9}>
          <ListItem button component={Link} to={titleUrl}>
            <Avatar>
              <ChatBubbleIcon />
            </Avatar>
            <ListItemText
              primary={messageboard.title}
              secondary={
                "by " + messageboard.author.username + " on " + environment.name
              }
            />
          </ListItem>
        </Grid>
        <Hidden xsDown>
          <Grid item sm={3}>
            <ListItem>
              <List>
                {tags.map(tag => {
                  const label = tag.length > 20 ? tag.substring(0, 17) + '...' : tag // TODO: Do this at breakpoints
                  return (
                    <Chip
                      label={label}
                      key={tag}
                      // clickable
                      size="small"
                      className={classes.tagStyle}
                      color="primary"
                    />
                  );
                })}
              </List>
            </ListItem>
          </Grid>
        </Hidden>
        <Grid item sm={2} xs={3}>
          <ListItem>
            <MessageBoardsActions classes={classes} messageboard={messageboard} />
          </ListItem>
        </Grid>
      </Grid>
    );
  }
};

MessageBoardItem.propTypes = {
  messageboard: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageBoardItem);
