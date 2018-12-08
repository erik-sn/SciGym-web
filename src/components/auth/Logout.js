import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
      <Link onClick={this.logoutUser} to="/">
       Logout
      </Link>
    );
  }
}

Logout.propTypes = {
  logout: PropTypes.func,
};

const mapStateToProps = state => ({
  appClientId: state.config.appClientId
});

const mapDispatchToProps = { logout };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
