import React from 'react';
import { withStyles } from '@material-ui/core';

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
        backgroundImage: 'url(http://localhost:8000/static/images/ai_photonics_banner.jpg',
      }}
    />
  );
};

export default withStyles(styles)(Hero);
