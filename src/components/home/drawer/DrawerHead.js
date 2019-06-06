import React from 'react';

import { withStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import { SciGymLogo } from '../../files/images';

const styles = theme => ({
  root: {
    flex: '1',
    textAlign: 'center',
  },
  logoStyle: {
    margin: 'auto',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
});

const DrawerHead = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Button className={classes.logoStyle}>
        <SciGymLogo />
      </Button>
      <Divider />
    </div>
  );
};

export default withStyles(styles)(DrawerHead);
