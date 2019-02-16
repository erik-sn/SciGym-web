import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserRepositories } from '../../actions/repositories';

class UserWatcher extends Component {
  componentDidUpdate(prevProps, prevState) {
    this.props.getUserRepositories();
  }

  render() {
    return <React.Fragment />;
  }
}

const mapStateToProps = state => ({
  userExists: Boolean(state.user.accessToken),
});

const mapDispatchToProps = { getUserRepositories };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserWatcher);
