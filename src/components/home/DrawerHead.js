import React from 'react';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import { SciGymLogo } from '../files/images';

const styles = theme => ({
  root: {
    flex: '1',
  },
  title: {
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 6,
  },
  text: {
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 3,
  },
  logoStyle: {
    margin: theme.spacing.unit * 2,
  },
});

const DrawerHead = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        SciGym
      </Typography>
      <Button className={classes.logoStyle}>
        <SciGymLogo />
      </Button>
      <Divider />
    </div>
  );
};

export default withStyles(styles)(DrawerHead);