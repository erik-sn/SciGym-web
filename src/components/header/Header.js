import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Alignment,
  Button,
  Classes,
  InputGroup,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Spinner
} from "@blueprintjs/core";
import Login from "../auth/Login";
import types from "../../utils/types";
import "./Header.css";

export class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event) {
    event.preventDefault();
    this.setState({ searchValue: event.target.value });
  }

  render() {
    const { loading } = this.props;
    const { searchValue } = this.state;
    return (
      <Navbar className="bp3-dark header">
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>
            <Link to="/">Stadium</Link>
          </NavbarHeading>
          <NavbarDivider />
          <Button className={Classes.MINIMAL} icon="home">
            <Link to="/">Home</Link>
          </Button>
          <InputGroup
            className="header__search"
            leftIcon="search"
            onChange={this.handleSearchChange}
            placeholder="Search environments"
            value={searchValue}
          />
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          <Button className={Classes.MINIMAL} icon="question">
            <Link to="/about">About</Link>
          </Button>
          {loading ? <Spinner size={30} /> : <Login />}
        </NavbarGroup>
      </Navbar>
    );
  }
}

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  loading: Boolean(
    state.display.loaders.find(l => l === types.LOGIN_USER_GITHUB_OAUTH)
  )
});

export default withRouter(connect(mapStateToProps)(Header));
