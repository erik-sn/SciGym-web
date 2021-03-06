import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import InfoIcon from '@material-ui/icons/Info';
import Popover from '@material-ui/core/Popover';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import constants from '../../utils/constants';
import { TwitterIcon, GithubIcon } from '../files/images';

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
    background: 'rgba(255, 255, 255, 0.6)',
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
  mediaButtons: {
    position: 'absolute',
  },
  iconStyle: {
    position: 'absolute',
    right: '10px',
    top: '10px',
  },
  popContentStyle: {
    margin: theme.spacing.unit,
  },
});

class Hero extends Component {
  state = {
    anchorEl: null,
  };
  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };
  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    const open = Boolean(anchorEl);
    return (
      <MuiThemeProvider theme={theme}>
        <div
          className={classes.hero}
          style={{
            backgroundImage: `url(${constants.STATIC_URL.concat(constants.BANNER)}`,
          }}
        >
          <Paper className={classes.overlay}>
            <Typography variant="h4" className={classes.titleStyle}>
              Reinforcement Learning for Science
            </Typography>
            <Hidden smUp>
              <Typography variant="subtitle2" className={classes.textStyle}>
                Welcome to <b>SciGym</b>, the open source library for reinforcement learning
                environments in science.
              </Typography>
            </Hidden>
            <Hidden xsDown>
              <Typography variant="subtitle1" className={classes.textStyle}>
                Welcome to <b>SciGym</b>, the open source library for reinforcement learning
                environments in science.
              </Typography>
            </Hidden>
            <Hidden xsDown>
              <div className={classes.mediaButtons}>
                <Button href="https://github.com/hendrikpn/scigym">
                  <GithubIcon />
                </Button>
                <Button href="https://twitter.com/scigym_ai">
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
          <IconButton
            onClick={this.handleClick}
            variant="contained"
            color="primary"
            className={classes.iconStyle}
          >
            <InfoIcon />
          </IconButton>
          <Popover
            id="credits-popper"
            open={open}
            anchorEl={anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Typography className={classes.popContentStyle}>
              Image Credit: University of Innsbruck/Harald Ritsch
            </Typography>
          </Popover>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Hero);
