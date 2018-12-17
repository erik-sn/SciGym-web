import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import EnvironmentItem from "./EnvironmentItem";
import { withStyles } from "@material-ui/core";
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import Hero from "./Hero";

const styles = {
  root: {
    flexGrow: 1,
  }
};

class Home extends Component {
  render() {
    const { classes } = this.props;
    // const loaded = repositories !== undefined;
    // const empty = loaded && repositories.size > 0;

    const { environments } = this.props;
    const loaded = environments !== undefined;
    const empty = loaded && environments.length === 0;
    return (
      <div className={classes.root}>
      <Hero/>
      <Grid container justify="center">
        <div>
        <h1>Recent environments</h1>
        {empty && <h1>No environments found</h1>}
        {loaded && (
          <List>
            {environments.map(env => (
              <React.Fragment key={env.id}>
                <EnvironmentItem
                  key={env.id}
                  environment={env}
                />
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
  environments: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => ({
  repositories: state.repositories.repositories,
  environments: state.environments.environments
});

export default compose(
  connect(mapStateToProps), 
  withStyles(styles)
)(Home);
