import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Icon, Intent } from "@blueprintjs/core";

import AppToaster from "../../utils/toast";
import "./Login.css";

export class Login extends Component {
  componentDidMount() {
    this.checkUserLoggedIn({}, this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    this.checkUserLoggedIn(prevProps, this.props);
  }

  checkUserLoggedIn(prev, now) {
    if (!prev.userExists && now.userExists) {
      AppToaster.show({
        message: "Successfully logged in",
        intent: Intent.SUCCESS
      });
    }
  }

  render() {
    const {
      githubClientId,
      githubCallbackUrl,
      githubRandomState,
      userExists
    } = this.props;
    const github_oauth_link = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${githubCallbackUrl}&state=${githubRandomState}`;
    return userExists ? (
      <Link className="bp3-button bp3-minimal login__link" to="/profile">
        <Icon icon="user" />
        My Profile
      </Link>
    ) : (
      <a
        className="bp3-button bp3-minimal login__link"
        href={github_oauth_link}
      >
        <Icon icon="user" />
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
  userExists: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  githubClientId: state.config.githubClientId,
  githubCallbackUrl: state.config.githubCallbackUrl,
  githubRandomState: state.config.githubRandomState,
  userExists: Boolean(state.user.accessToken)
});

export default connect(mapStateToProps)(Login);
