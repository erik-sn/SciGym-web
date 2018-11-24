import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Auth from "./auth/Auth";
import Header from "./header/Header";
import { getApiConfig, getApiStatus } from "../actions/config";
import { getEnvironments } from "../actions/environments";
import Profile from "./profile/Profile";

export class App extends Component {
  componentDidMount() {
    this.refreshAuthToken();
    this.props.getApiConfig();
    this.props.getApiStatus();
    this.props.getEnvironments();
    window.setTimeout(this.props.getApiStatus, 30000);
  }

  refreshAuthToken() {}

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
          <Route path="*" component={Profile} />
        </Switch>
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
  getEnvironments: PropTypes.func.isRequired,
  githubCallbackUrl: PropTypes.string
};

const mapStateToProps = state => ({
  githubCallbackUrl: state.config.githubCallbackUrl,
  appLoaded: state.config.loaded
});

export default connect(
  mapStateToProps,
  { getApiConfig, getApiStatus, getEnvironments }
)(App);
