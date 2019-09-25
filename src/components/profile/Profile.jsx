import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import { withStyles } from '@material-ui/core';

import Account from './account/Account';
import Groups from './groups/Groups';
import Settings from './Settings';
import Repositories from './repositories/Repositories';
import Images from './images/Images';
import MessageBoards from './messageboards/MessageBoards';

const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    height: '100%',
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
        <Route path="/profile/messageboards" component={MessageBoards} />
        <Route path="/profile/images" component={Images} />
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
