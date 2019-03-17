import React from 'react';
import { withStyles } from '@material-ui/core';

import constants from '../../utils/constants';

const styles = theme => ({
  hero: {
    height: '400px',
    width: '100%',
    backgroundPosition: '50% 50%',
    backgroundSize: 'cover',
    [theme.breakpoints.down('xs')]: {
      height: '240px',
    },
    [theme.breakpoints.up('lg')]: {
      height: '500px',
    },
  },
});

const Hero = props => {
  const { classes } = props;
  return (
    <div
      className={classes.hero}
      style={{
        backgroundImage: `url(${constants.STATIC_URL.concat(constants.BANNER)}`,
      }}
    />
  );
};

export default withStyles(styles)(Hero);
