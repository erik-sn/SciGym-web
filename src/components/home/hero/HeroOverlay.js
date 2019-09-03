import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

import { TwitterIcon, GithubIcon } from '../../files/images';

const HeroOverlay = ({ classes }) => {
  return (
    <Paper className={classes.overlay}>
      <Typography variant="h4" className={classes.titleStyle}>
        Reinforcement Learning for Science
      </Typography>
      <Hidden smUp>
        <Typography variant="subtitle2" className={classes.textStyle}>
          Welcome to <b>SciGym</b>, the open source library for reinforcement learning environments
          in science.
        </Typography>
      </Hidden>
      <Hidden xsDown>
        <Typography variant="subtitle1" className={classes.textStyle}>
          Welcome to <b>SciGym</b>, the open source library for reinforcement learning environments
          in science.
        </Typography>
      </Hidden>
      <Hidden xsDown>
        <div className={classes.mediaButtons}>
          <Button href="https://github.com/hendrikpn/scigym" target="_blank" rel="noopener noreferrer">
            <GithubIcon />
          </Button>
          <Button href="https://twitter.com/scigym_ai" target="_blank" rel="noopener noreferrer">
            <TwitterIcon />
          </Button>
        </div>
      </Hidden>
      <Button
        component={Link}
        to="/get-started"
        variant="contained"
        color="primary"
        className={classes.buttonStyle}
      >
        Get Started
      </Button>
    </Paper>
  );
};

HeroOverlay.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default HeroOverlay;
