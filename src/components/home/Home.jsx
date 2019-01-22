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
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "AliceBlue",
  },
  title: {
    margin: theme.spacing.unit*2,
    marginTop: theme.spacing.unit*6,
  }
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    const environments = this.props.searchedEnvironments ? this.props.searchedEnvironments : this.props.environments;
    const empty = environments.length === 0;
    return (
      <div className={classes.root}>
      <Hero/>
      <Grid container justify="center">
        <div>
        <Typography variant="h4" className={classes.title}>Recent environments</Typography>
        {empty && <Typography variant="h6" className={classes.title}>No environments found</Typography>}
        {!(empty) && (
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
  environments: PropTypes.arrayOf(PropTypes.object),
  searchedEnvironments: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => ({
  repositories: state.repositories.repositories,
  environments: state.environments.environments,
  searchedEnvironments: state.environments.searchedEnvironments
});

export default compose(
  connect(
    mapStateToProps
  ), 
  withStyles(styles)
)(Home);
