import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import './Login.css';

const styles = {};

export class Login extends Component {
  get githubOauthLink() {
    const { githubClientId, githubCallbackUrl, githubRandomState } = this.props;
    return `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${githubCallbackUrl}&state=${githubRandomState}`;
  }

  render() {
    const props = { onClick: this.props.onClick };
    const { userExists } = this.props;
    if (userExists) {
      props.component = Link;
      props.to = '/profile';
    } else {
      props.component = 'a';
      props.href = this.githubOauthLink;
    }
    return <MenuItem {...props}>{userExists ? 'My Profile' : 'Login'}</MenuItem>;
  }
}

Login.propTypes = {
  githubClientId: PropTypes.string.isRequired,
  githubCallbackUrl: PropTypes.string.isRequired,
  githubRandomState: PropTypes.string.isRequired,
  children: PropTypes.any,
  userExists: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    githubClientId: state.config.githubClientId,
    githubCallbackUrl: state.config.githubCallbackUrl,
    githubRandomState: state.config.githubRandomState,
    userExists: state.user.exists,
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Login);
