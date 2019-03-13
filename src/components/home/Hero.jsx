import React from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import constants from '../../utils/constants';

const defaultTheme = createMuiTheme();
const { breakpoints } = defaultTheme;

const theme = {
  ...defaultTheme,
  overrides: {
    MuiTypography: {
      h4: {
        fontSize: '2rem',
        [breakpoints.down('xs')]: {
          fontSize: '1.4rem',
        },
      },
    },
  },
};

const styles = theme => ({
  hero: {
    position: 'relative',
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
  overlay: {
    position: 'absolute',
    width: '50%',
    paddingLeft: theme.spacing.unit * 10,
    paddingTop: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 10,
    backgroundColor: 'white',
    opacity: '0.6',
    top: '50px',
    [theme.breakpoints.down('xs')]: {
      top: '25px',
      width: '80%',
      paddingLeft: theme.spacing.unit * 2,
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    [theme.breakpoints.up('lg')]: {
      top: '75px',
      width: '25%',
    },
  },
  titleStyle: {
    margin: theme.spacing.unit,
  },
  textStyle: {
    margin: theme.spacing.unit,
  },
  buttonStyle: {
    position: 'absolute',
    margin: theme.spacing.unit,
    right: '20px',
  },
});

const Hero = props => {
  const { classes } = props;
  return (
    <MuiThemeProvider theme={theme}>
      <div
        className={classes.hero}
        style={{
          backgroundImage: `url(${constants.STATIC_URL}/images/ai_photonics_banner.jpg`,
        }}
      >
        <Paper className={classes.overlay}>
          <Typography variant="h4" className={classes.titleStyle}>
            Reinforcement Learning for Science
          </Typography>
          <Typography variant="p" className={classes.textStyle}>
            Welcome to <b>SciGym</b>, the open source library for reinforcement learning
            environments in science.
          </Typography>
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
      </div>
    </MuiThemeProvider>
  );
};

export default withStyles(styles)(Hero);
