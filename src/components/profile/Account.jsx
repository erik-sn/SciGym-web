import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import AccountForm from './AccountForm';
import AccountDanger from './AccountDanger';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
  },
});

function Account(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h3">
        Update Account Details
      </Typography>
      <AccountForm />
      <Divider />
      <AccountDanger />
    </div>
  );
}

Account.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Account);
