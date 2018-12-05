import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card } from "@blueprintjs/core";

import Hero from "./Hero";
import RepositoryItem from "../profile/RepositoryItem";

class Home extends Component {
  render() {
    const { repositories } = this.props;
    const loaded = repositories !== undefined;
    const empty = loaded && repositories.size > 0;
    return (
      <React.Fragment>
        <Hero />
        <h1>Recent repositories</h1>
        {empty && <h1>No repositories found</h1>}
        {loaded && (
          <ul>
            {repositories.map(r => (
              <RepositoryItem
                key={r.id}
                {...r}
                createEnvironment={this.createEnvironment}
              />
            ))}
          </ul>
        )}
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => ({
  repositories: state.repositories.repositories
});

export default connect(mapStateToProps)(Home);
