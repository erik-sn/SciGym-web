import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    width: '100%',
    textAlign: 'center',
  },
});

const Groups = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h3">
        Coming soon!
      </Typography>
    </div>
  );
};

Groups.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Groups);
