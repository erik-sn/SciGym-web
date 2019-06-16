import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Refresh from '@material-ui/icons/Refresh';
import Typography from '@material-ui/core/Typography';

import types from '../../../utils/types';
import { isLoading } from '../../../reducers/display';
import { findGymRepos, getUserRepositories } from '../../../actions/repositories';
import RepositoryList from './RepositoryList';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  buttonStyle: {
    margin: theme.spacing.unit * 2,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  title: {
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 6,
  },
});

class Repositories extends Component {
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
    const { repositories, findGymLoading, gymRepo, notGymRepo } = this.props;
    const empty = repositories.length === 0;
    const emptyGym = gymRepo.length === 0;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <div>
            <Typography variant="h4" className={classes.title}>
              My repositories
            </Typography>
            {findGymLoading ? (
              <CircularProgress size={45} />
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={this.findGymRepos}
                className={classes.buttonStyle}
              >
                <Refresh className={classes.leftIcon} />
                Refresh my repositories
              </Button>
            )}
            {empty && (
              <Typography variant="h6" className={classes.title}>
                No repositories found
              </Typography>
            )}
            {!empty && (
              <RepositoryList
                classes={classes}
                emptyGym={emptyGym}
                gymRepo={gymRepo}
                notGymRepo={notGymRepo}
              />
            )}
          </div>
        </Grid>
      </div>
    );
  }
}

Repositories.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object),
  findGymRepos: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userExists: state.user.exists,
  repositories: state.repositories.userRepositories,
  findGymLoading: isLoading(state.display, types.FIND_GYM_REPOS),
  gymRepo: state.repositories.userRepositories.filter(repo => repo['gym']),
  notGymRepo: state.repositories.userRepositories.filter(repo => !repo['gym']),
});

const mapDispatchToProps = {
  findGymRepos,
  getUserRepositories,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(Repositories);
