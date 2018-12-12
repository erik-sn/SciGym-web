import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import RepositoryItem from "../profile/RepositoryItem";
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
    const { repositories } = this.props;
    const loaded = repositories !== undefined;
    const empty = loaded && repositories.size > 0;
    return (
      <div className={classes.root}>
      <Hero/>
      <Grid container justify="center">
        <div>
          <h1>Recent repositories</h1>
          {empty && <h1>No repositories found</h1>}
          {loaded && (
            <List>
              {repositories.map(r => (
                <React.Fragment key={r.id}>
                  <RepositoryItem
                    key={r.id}
                    repo={r}
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
  repositories: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => ({
  repositories: state.repositories.repositories
});

export default compose(
  connect(mapStateToProps), 
  withStyles(styles)
)(Home);
