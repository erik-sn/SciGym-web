import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import types from "../../utils/types";
import { isLoading } from "../../reducers/display";
import { findGymRepos, getUserRepositories } from "../../actions/repositories";
import { createEnvironment } from "../../actions/environments";
import RepositoryItem from "./RepositoryItem";
import { withStyles } from "@material-ui/core";
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Refresh from '@material-ui/icons/Refresh';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.findGymRepos = this.findGymRepos.bind(this);
  }

  componentDidMount() {
    if (this.props.userExists) {
      this.props.getUserRepositories();
    }
  }

  findGymRepos() {
    this.props.findGymRepos();
  }

  render() {
    const { repositories, findGymLoading } = this.props;
    const loaded = repositories !== undefined;
    const empty = loaded && repositories.size > 0;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <Grid container justify="center">
        <div>
        <h1>My repositories</h1>
        {findGymLoading ? (
          <CircularProgress size={45} />
        ) : (
          <Button variant="contained" color="primary" onClick={this.findGymRepos}>
          <Refresh className={classes.leftIcon}/>
          Refresh my repositories
          </Button>
        )}
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

Profile.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object),
  findGymRepos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userExists: Boolean(state.user.accessToken),
  repositories: state.repositories.userRepositories,
  findGymLoading: isLoading(state.display, types.FIND_GYM_REPOS)
});
const mapDispatchToProps = {
  findGymRepos,
  getUserRepositories,
  createEnvironment
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps),
    withStyles(styles)
)(Profile);