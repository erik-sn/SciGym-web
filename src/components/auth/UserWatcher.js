import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserRepositories } from '../../actions/repositories';

class UserWatcher extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.userExists && this.props.userExists) {
      this.props.getUserRepositories();
    }
  }

  render() {
    return <React.Fragment />;
  }
}

const mapStateToProps = state => ({
  userExists: state.user.exists,
});

const mapDispatchToProps = { getUserRepositories };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserWatcher);
