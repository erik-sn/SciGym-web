import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Card, Spinner } from "@blueprintjs/core";

import types from "../../utils/types";
import { isLoading } from "../../reducers/display";
import { findGymRepos, getUserRepositories } from "../../actions/repositories";
import { createEnvironment } from "../../actions/environments";
import RepositoryItem from "./RepositoryItem";
import "./profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.findGymRepos = this.findGymRepos.bind(this);
  }

  componentDidMount() {
    if (this.props.userExists) {
      this.props.getUserRepositories();
    }
  }

  findGymRepos() {
    this.props.findGymRepos();
  }

  render() {
    const { repositories, findGymLoading } = this.props;
    const loaded = repositories !== undefined;
    const empty = loaded && repositories.size > 0;
    return (
      <Card>
        <h1>My repositories</h1>
        {findGymLoading ? (
          <Spinner size={45} />
        ) : (
          <Button
            icon="refresh"
            intent="success"
            text="Refresh my repos"
            onClick={this.findGymRepos}
          />
        )}
        {empty && <h1>No repositories found</h1>}
        {loaded && (
          <ul>
            {repositories.map(r => (
              <RepositoryItem key={r.id} {...r} />
            ))}
          </ul>
        )}
      </Card>
    );
  }
}

Profile.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object),
  findGymRepos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userExists: Boolean(state.user.accessToken),
  repositories: state.repositories.userRepositories,
  findGymLoading: isLoading(state.display, types.FIND_GYM_REPOS)
});
const mapDispatchToProps = {
  findGymRepos,
  getUserRepositories,
  createEnvironment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
