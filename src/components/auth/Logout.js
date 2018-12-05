import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "@blueprintjs/core";

import { logout } from "../../actions/user";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser() {
    this.props.logout(this.props.appClientId);
  }

  render() {
    return (
      <Button
        icon="log-out"
        intent="danger"
        text="logout"
        onClick={this.logoutUser}
      />
    );
  }
}

Logout.propTypes = {
  logout: PropTypes.string,
  findGymRepos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  appClientId: state.config.appClientId
});

const mapDispatchToProps = { logout };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
