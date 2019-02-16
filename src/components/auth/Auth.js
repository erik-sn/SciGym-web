import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { loginUserWithGithub } from '../../actions/user';

export class Auth extends Component {
  componentWillMount() {
    console.log('login user');
    const code = this.getUrlParams('code');
    const state = this.getUrlParams('state');
    this.props.loginUserWithGithub(code, state);
  }

  getUrlParams(prop) {
    var params = {};
    var search = decodeURIComponent(
      window.location.href.slice(window.location.href.indexOf('?') + 1)
    );
    var definitions = search.split('&');

    definitions.forEach(function(val, key) {
      var parts = val.split('=', 2);
      params[parts[0]] = parts[1];
    });

    return prop && prop in params ? params[prop] : params;
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default connect(
  null,
  { loginUserWithGithub }
)(Auth);
