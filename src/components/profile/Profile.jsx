import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Card } from "@blueprintjs/core";

import { findGymRepos } from "../../actions/repositories";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.findGymRepos = this.findGymRepos.bind(this);
  }

  findGymRepos() {
    this.props.findGymRepos();
  }

  render() {
    const { repositories } = this.props;
    const loaded = repositories !== undefined;
    const empty = loaded && repositories.size > 0;
    return (
      <Card>
        <h1>My repositories</h1>
        <Button
          icon="refresh"
          intent="danger"
          text="Find gym repos"
          onClick={this.findGymRepos}
        />
        {empty && <h1>No repositories found</h1>}
      </Card>
    );
  }
}

Profile.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object),
  findGymRepos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  repositories: state.repositories.userRepositories
});
const mapDispatchToProps = { findGymRepos };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
