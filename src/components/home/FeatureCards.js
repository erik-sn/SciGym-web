import React, { Component } from 'react';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';

import constants from '../../utils/constants';

const styles = theme => ({
  cardStyle: {
    width: '300px',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  mediaStyle: {
    textAlign: 'center',
    marginTop: theme.spacing.unit,
    height: '160px',
  },
  contentStyle: {
    height: '170',
  },
  titleStyle: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  imgStyle: {
    margin: 'auto',
  },
});

class FeatureCards extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={32} justify="flex-start">
        <Grid key="1" item>
          <div className={classes.cardStyle}>
            <div className={classes.contentStyle}>
              <Typography variant="h6" className={classes.titleStyle}>
                Science Problems packaged as APIs
              </Typography>
              <Typography variant="subtitle1">
                In Reinforcement Learning an agent interacts with an environment to achieve some
                goal. Our environments encode problems in science packaged as APIs.
              </Typography>
            </div>
            <div className={classes.mediaStyle}>
              <img
                className={classes.imgStyle}
                src={`${constants.STATIC_URL}/icons/scigym-logo.png`} // update with constants
                height="150"
                width="150"
                alt=""
              />
            </div>
            <Hidden smUp>
              <Divider />
            </Hidden>
          </div>
        </Grid>
        <Grid key="2" item>
          <div className={classes.cardStyle}>
            <div className={classes.contentStyle}>
              <Typography variant="h6" className={classes.titleStyle}>
                Reinforcement Learning for Science
              </Typography>
              <Typography variant="subtitle1">
                SciGym is a resource for facilitating the development of reinforcement learning
                based solutions to problems in physics and other sciences.
              </Typography>
            </div>
            <div className={classes.mediaStyle}>
              <img
                src={`${constants.STATIC_URL}/icons/scigym-logo.png`} // update with constants
                height="150"
                width="150"
                alt=""
              />
            </div>
            <Hidden smUp>
              <Divider />
            </Hidden>
          </div>
        </Grid>
        <Grid key="3" item>
          <div className={classes.cardStyle}>
            <div className={classes.contentStyle}>
              <Typography variant="h6" className={classes.titleStyle}>
                Connecting Computer Science and other Disciplines
              </Typography>
              <Typography variant="subtitle1">
                SciGym is an attempt to stimulate an open and meaningful exchange between computer
                scientists and researchers in other disciplines.
              </Typography>
            </div>
            <div className={classes.mediaStyle}>
              <img
                src={`${constants.STATIC_URL}/icons/scigym-logo.png`} // update with constants
                height="150"
                width="150"
                alt=""
              />
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(FeatureCards);
