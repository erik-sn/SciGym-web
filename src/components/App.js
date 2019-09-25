import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';

import Auth from './auth/Auth';
import UserWatcher from './auth/UserWatcher';
import Header from './header/Header';
import { getApiConfig, getApiStatus } from '../actions/config';
import { getRepositories } from '../actions/repositories';
import { refreshAuthToken } from '../actions/user';
import { getEnvironments } from '../actions/environments';
import { getTopics } from '../actions/topics';
import { getImageConfig } from '../actions/images';
import { getContributors } from '../actions/contributors';
import { getMessageBoards, countComments } from '../actions/messageboards';
import Home from './home/Home';
import Profile from './profile/Profile';
import GetStarted from './get_started/GetStarted';
import Impressum from './impressum/Impressum';
import Notifications from './Notifications';
import constants from '../utils/constants';
import EnvironmentDetail from './environment/EnvironmentDetail';
import PrivatePolicy from './policy/PrivatePolicy';
import TermsAndConditions from './policy/TermsAndConditions';
import Discussion from './forum/Discussion';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false
    };
  }
  componentDidMount() {
    this.refreshAuthToken();
    this.props.getApiConfig();
    this.props.getApiStatus();
    this.props.getRepositories();
    this.props.getEnvironments();
    this.props.getTopics();
    this.props.getImageConfig();
    this.props.getContributors();
    this.props.getMessageBoards();
    this.props.countComments();
    window.setTimeout(this.props.getApiStatus, 30000); // do we need this?
  }

  refreshAuthToken() {
    const storedRefreshToken = localStorage.getItem(constants.REFRESH_TOKEN);
    if (storedRefreshToken) {
      this.props.refreshAuthToken(storedRefreshToken);
    }
  }

  componentDidUpdate(prevProps) {
    // here we force an update on any message board when it is opened.
    const prevPath = prevProps.location.pathname
    const currPath = this.props.location.pathname
    if (this.state.change) {
      this.setState({
        change: false
      })
    }
    if (currPath.includes('/env') && currPath.includes('/forum')) {
      if (prevPath !== currPath) {
        this.setState({
          change: true,
        })
      }
    }
  }

  render() {
    if (!this.props.appLoaded) {
      return (
        <div style={{ textAlign: 'center', paddingTop: '200px', backgroundColor: 'AliceBlue' }}>
          <h1>
            {' '}
            <CircularProgress variant="indeterminate" /> We are loading
          </h1>
        </div>
      );
    }

    const oauthPath = new URL(this.props.githubCallbackUrl).pathname;
    const oauthPathCallBack = oauthPath.concat('env/:callbackURL')
    return (
      <div className="App">
        <Route key="auth" exact path={oauthPath} component={Auth} />
        <Route key="auth-params" path={oauthPathCallBack} component={Auth} />
        <Header />
        <Switch>
          <Route path="/profile" component={Profile} />
          <Route path="/get-started" component={GetStarted} />
          <Route exact path="/env/:env_name" component={EnvironmentDetail} />
          <Route path="/env/:env_name/forum/:board_title" render={props => (<Discussion {...props} change={this.state.change} />)} />
          <Route path="/impressum" component={Impressum} />
          <Route path="/policy/private-policy" component={PrivatePolicy} />
          <Route path="/policy/terms-and-conditions" component={TermsAndConditions} />
          <Route path="*" component={Home} />
        </Switch>
        <UserWatcher />
        <Notifications />
      </div>
    );
  }
}

App.defaultProps = {
  githubCallbackUrl: null,
};

App.propTypes = {
  appLoaded: PropTypes.bool.isRequired,
  getApiConfig: PropTypes.func.isRequired,
  getApiStatus: PropTypes.func.isRequired,
  getRepositories: PropTypes.func.isRequired,
  refreshAuthToken: PropTypes.func.isRequired,
  githubCallbackUrl: PropTypes.string,
  getEnvironments: PropTypes.func.isRequired,
  getTopics: PropTypes.func.isRequired,
  getImageConfig: PropTypes.func.isRequired,
  getContributors: PropTypes.func.isRequired,
  getMessageBoards: PropTypes.func.isRequired,
  countComments: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  githubCallbackUrl: state.config.githubCallbackUrl,
  appLoaded: state.config.loaded,
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      getApiConfig,
      getApiStatus,
      refreshAuthToken,
      getRepositories,
      getEnvironments,
      getTopics,
      getImageConfig,
      getContributors,
      getMessageBoards,
      countComments,
    }
  )(App)
);
