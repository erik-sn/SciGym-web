import React from 'react'
import { withStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

const styles = theme => ({
  root: {
    flex: '1',
  },
});

const MessageBoardHead = props => {
  const { classes } = props;
  return (
    <Grid container className={classes.root}>
      <Grid item sm={7} xs={9}>
        <ListItem>
          <Typography variant="subtitle1">
            Message Board
          </Typography>
        </ListItem>
      </Grid>
      <Hidden xsDown>
        <Grid item sm={3}>
          <ListItem>
            <Typography variant="subtitle1">
              Tags
              </Typography>
          </ListItem>
        </Grid>
      </Hidden>
      <Grid item sm={2} xs={3}>
        <ListItem>
          <Typography variant="subtitle1">
            Replies
          </Typography>
        </ListItem>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(MessageBoardHead);
