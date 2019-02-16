import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import { compose } from 'redux';

// import { debounce } from "lodash";
// import { Intent } from "@blueprintjs/core";
// import toast from "../../utils/toast";

import './Login.css';

const styles = {
  linkStyle: {
    textDecoration: 'none',
  },
};

export class Login extends Component {
  // constructor(props) {
  //   super(props);
  //   this.checkUserLoggedIn = debounce(this.checkUserLoggedIn, 300);
  // }

  // componentDidMount() {
  //   this.checkUserLoggedIn({}, this.props);
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   this.checkUserLoggedIn(prevProps, this.props);
  // }

  // checkUserLoggedIn(prev, now) {
  //   if (!prev.userExists && now.userExists) {
  //     toast.show({
  //       message: "Successfully logged in",
  //       intent: Intent.SUCCESS
  //     });
  //   }
  // }

  render() {
    const {
      classes,
      githubClientId,
      githubCallbackUrl,
      githubRandomState,
      userExists,
    } = this.props;
    const github_oauth_link = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${githubCallbackUrl}&state=${githubRandomState}`; //&scope=repo
    return userExists ? (
      <Link to="/profile" className={classes.linkStyle}>
        My Profile
      </Link>
    ) : (
      <a href={github_oauth_link} className={classes.linkStyle}>
        Login
      </a>
    );
  }
}

Login.propTypes = {
  githubClientId: PropTypes.string.isRequired,
  githubCallbackUrl: PropTypes.string.isRequired,
  githubRandomState: PropTypes.string.isRequired,
  children: PropTypes.any,
  userExists: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    githubClientId: state.config.githubClientId,
    githubCallbackUrl: state.config.githubCallbackUrl,
    githubRandomState: state.config.githubRandomState,
    userExists: Boolean(state.user.accessToken),
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Login);
