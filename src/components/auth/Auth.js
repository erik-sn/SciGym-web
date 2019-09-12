import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { loginUserWithGithub } from '../../actions/user';

export class Auth extends Component {
  componentWillMount() {
    const code = this.getUrlParams('code');
    const state = this.getUrlParams('state');
    this.props.loginUserWithGithub(code, state);
  }

  getUrlParams(prop) {
    let params = {};
    let search = decodeURIComponent(
      window.location.href.slice(window.location.href.indexOf('?') + 1)
    );
    let definitions = search.split('&');

    definitions.forEach(function (val, key) {
      let parts = val.split('=', 2);
      params[parts[0]] = parts[1];
    });

    return prop && prop in params ? params[prop] : params;
  }

  render() {
    const { callbackURL } = this.props
    const url = callbackURL ? '/env/'.concat(callbackURL) : '/';
    return <Redirect to={url} />;
  }
}

function mapStateToProps(state, ownProps) {
  const { callbackURL } = ownProps.match.params;
  return {
    callbackURL: callbackURL,
  };
};

export default connect(
  mapStateToProps,
  { loginUserWithGithub }
)(Auth);
