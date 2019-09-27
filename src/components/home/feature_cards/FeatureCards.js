import React, { Component } from 'react';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import FeatureCardAPI from './FeatureCardAPI';
import FeatureCardRL from './FeatureCardRL';
import FeatureCardConnect from './FeatureCardConnect';

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
  imgStyleAPI: {
    height: '120px',
    width: '152px',
  },
  imgStyleRL: {
    paddingTop: '10px',
    height: '140px',
    width: '140px',
  },
  imgStyleConnect: {
    paddingTop: '10px',
    height: '140px',
    width: '127px',
  },
});

class FeatureCards extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={32} justify="flex-start">
        <Grid key="1" item>
          <FeatureCardAPI classes={classes} />
        </Grid>
        <Grid key="2" item>
          <FeatureCardRL classes={classes} />
        </Grid>
        <Grid key="3" item>
          <FeatureCardConnect classes={classes} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(FeatureCards);
