import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import { withStyles } from '@material-ui/core';

import Account from './Account';
import Groups from './Groups';
import Settings from './Settings';
import Repositories from './Repositories';

const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    height: 'calc(100vh - 60px)',
  },
});

const Profile = ({ classes, userExists }) => {
  if (!userExists) {
    return <Redirect to="/" />;
  }
  return (
    <div className={classes.root}>
      <Settings />
      <Switch>
        <Route path="/profile/account" component={Account} />
        <Route path="/profile/groups" component={Groups} />
        <Route path="*" component={Repositories} />
      </Switch>
    </div>
  );
};

Profile.propTypes = {
  userExists: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  userExists: state.user.exists,
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Profile);
