import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

import AccountDelete from './AccountDelete';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 2,
  },
  button: {
    marginTop: theme.spacing.unit,
    width: 250,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

const Account = ({ classes }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <div className={classes.root}>
      <AccountDelete open={showConfirm} handleClose={() => setShowConfirm(false)} />
      <Typography variant="h4" component="h3">
        Delete Account
      </Typography>
      <Typography component="p">
        This action will permanently delete your account. This cannot be undone!
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={() => setShowConfirm(true)}
      >
        Delete my account
        <DeleteIcon className={classes.rightIcon} />
      </Button>
    </div>
  );
};

Account.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Account);
