import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';

import EnvironmentItem from './EnvironmentItem';
import Hero from './Hero';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'AliceBlue',
  },
  title: {
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 6,
  },
});

class Home extends Component {
  get title() {
    if (this.props.searchedEnvironments) {
      return 'Search results';
    }
    return 'Recent environments';
  }
  render() {
    const { classes } = this.props;
    const environments = this.props.searchedEnvironments
      ? this.props.searchedEnvironments
      : this.props.environments;
    const empty = environments.length === 0;
    return (
      <div className={classes.root}>
        <Hero />
        <Grid container justify="center">
          <div>
            <Typography variant="h4" className={classes.title}>
              {this.title}
            </Typography>
            {empty && (
              <Typography variant="h6" className={classes.title}>
                No environments found
              </Typography>
            )}
            {!empty && (
              <List>
                {environments.map(env => (
                  <React.Fragment key={env.id}>
                    <EnvironmentItem key={env.id} environment={env} />
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}
          </div>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object),
  environments: PropTypes.arrayOf(PropTypes.object),
  searchedEnvironments: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  repositories: state.repositories.repositories,
  environments: state.environments.environments,
  searchedEnvironments: state.environments.searchedEnvironments,
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Home);
