import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Header from "../Header";
import { getApiConfig, getApiStatus } from "../../actions/config";

class App extends Component {
  componentDidMount() {
    this.props.getApiConfig();
    this.props.getApiStatus();
    window.setTimeout(this.props.getApiStatus, 30000);
  }

  render() {
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

App.propTypes = {
  getApiConfig: PropTypes.func.isRequired,
  getApiStatus: PropTypes.func.isRequired
};

export default connect(
  null,
  { getApiConfig, getApiStatus }
)(App);
