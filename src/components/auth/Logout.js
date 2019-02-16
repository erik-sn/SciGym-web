import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MenuItem from '@material-ui/core/MenuItem';

import { logout } from '../../actions/user';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser() {
    this.props.onClick();
    this.props.logout(this.props.appClientId);
  }

  render() {
    return (
      <MenuItem onClick={this.logoutUser} component={Link} to="/">
        Logout
      </MenuItem>
    );
  }
}

Logout.propTypes = {
  logout: PropTypes.func,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  appClientId: state.config.appClientId,
});

const mapDispatchToProps = { logout };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
