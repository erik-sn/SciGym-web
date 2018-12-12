import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Auth from "./auth/Auth";
import UserWatcher from "./auth/UserWatcher";
import Header from "./header/Header";
import { getApiConfig, getApiStatus } from "../actions/config";
import { getRepositories } from "../actions/repositories";
import { refreshAuthToken } from "../actions/user";
import { getEnvironments } from "../actions/environments";
import Home from "./home/Home";
import Profile from "./profile/Profile";
import constants from "../utils/constants";

export class App extends Component {
  componentDidMount() {
    this.refreshAuthToken();
    this.props.getApiConfig();
    this.props.getApiStatus();
    this.props.getRepositories();
    this.props.getEnvironments();
    window.setTimeout(this.props.getApiStatus, 30000);
  }

  refreshAuthToken() {
    const storedRefreshToken = localStorage.getItem(constants.REFRESH_TOKEN);
    if (storedRefreshToken) {
      this.props.refreshAuthToken(storedRefreshToken);
    }
  }

  render() {
    if (!this.props.appLoaded) {
      return <h1>Loading</h1>;
    }

    const oauthPath = new URL(this.props.githubCallbackUrl).pathname;
    return (
      <div className="App">
        <Route path={oauthPath} component={Auth} />
        <Header />
        <Switch>
          <Route path="/profile" component={Profile} />
          <Route path="*" component={Home} />
        </Switch>
        <UserWatcher />
      </div>
    );
  }
}

App.defaultProps = {
  githubCallbackUrl: null
};

App.propTypes = {
  appLoaded: PropTypes.bool.isRequired,
  getApiConfig: PropTypes.func.isRequired,
  getApiStatus: PropTypes.func.isRequired,
  getRepositories: PropTypes.func.isRequired,
  refreshAuthToken: PropTypes.func.isRequired,
  githubCallbackUrl: PropTypes.string,
  getEnvironments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  githubCallbackUrl: state.config.githubCallbackUrl,
  appLoaded: state.config.loaded
});

export default withRouter(
  connect(
    mapStateToProps,
    { getApiConfig, getApiStatus, refreshAuthToken, getRepositories, getEnvironments }
  )(App)
);
