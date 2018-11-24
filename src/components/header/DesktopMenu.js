import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";

import Login from "../auth/Login";

class DesktopMenu extends Component {
  render() {
    const { className, userExists } = this.props;
    return (
      <div className={className}>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit">
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        {userExists ? (
          <IconButton component={Link} to="/profile" color="inherit">
            <AccountCircle />
          </IconButton>
        ) : (
          <Login>login</Login>
        )}
      </div>
    );
  }
}

DesktopMenu.propTypes = {
  className: PropTypes.string.isRequired,
  userExists: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  userExists: Boolean(state.user.accessToken)
});

export default connect(mapStateToProps)(DesktopMenu);
