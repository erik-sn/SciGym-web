import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import RepositoryItem from "../profile/RepositoryItem";
import { withStyles } from "@material-ui/core";
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';

const styles = {
  root: {
    flexGrow: 1,
  }
};

class Profile extends Component {
  render() {
    const { classes } = this.props;
    const { repositories } = this.props;
    const loaded = repositories !== undefined;
    const empty = loaded && repositories.size > 0;
    return (
      <div className={classes.root}>
      <Grid container justify="center">
        <div>
          <h1>All repositories</h1>
          {empty && <h1>No repositories found</h1>}
          {loaded && (
            <List>
              {repositories.map(r => (
                <React.Fragment key={r.id}>
                  <RepositoryItem
                    key={r.id}
                    {...r}
                    createEnvironment={this.createEnvironment}
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
)(Profile);
