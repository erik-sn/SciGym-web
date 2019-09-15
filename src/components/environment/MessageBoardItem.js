import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import Chip from '@material-ui/core/Chip';

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
});

class MessageBoardItem extends Component {
  render() {
    const { classes, messageboard, replies } = this.props;
    const { tags } = messageboard
    return (
      <Grid container className={classes.root}>
        <Grid item sm={7} xs={9}>
          <ListItem button component={Link} to="/">
            <Avatar>
              <ChatBubbleIcon />
            </Avatar>
            <ListItemText
              primary={messageboard.title}
              secondary={
                "by " + messageboard.author.username
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
            <Typography variant="subtitle1">
              {replies}
            </Typography>
          </ListItem>
        </Grid>
      </Grid>
    );
  }
};

MessageBoardItem.propTypes = {
  messageboard: PropTypes.object.isRequired,
  replies: PropTypes.number,
};

export default withStyles(styles)(MessageBoardItem);
