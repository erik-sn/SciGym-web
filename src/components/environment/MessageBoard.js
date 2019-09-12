import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import showdown from 'showdown';

import { withStyles, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';
import Edit from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';
import MessageBoardHead from './MessageBoardHead';
import MessageBoardForm from './MessageBoardForm';
import LoginForm from '../auth/LoginForm';
import types from '../../utils/types';
import { getErrors } from '../../reducers/errors';

const styles = theme => ({

  buttonStyle: {
    left: '0px',
    marginBottom: theme.spacing.unit * 4,
  },
  iconStyle: {
    marginLeft: theme.spacing.unit,
  },
  root: {
    marginTop: '40px',
    margin: 'auto',
    width: '90%',
    [theme.breakpoints.up('md')]: {
      width: '75%',
    },
    paddingBottom: '0px',
  },
});

class MessageBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openLogin: false,
      openForm: false
    };
  }

  handleClickOpenLogin = () => {
    const newStateOpen = !this.state.openLogin;
    this.setState({
      openLogin: newStateOpen,
    });
  };

  handleClickOpenForm = () => {
    const newStateOpen = !this.state.openForm;
    this.setState({
      openForm: newStateOpen,
    });
  };

  handleCloseLogin = () => {
    this.setState({ openLogin: false });
  };

  handleCloseForm = () => {
    this.setState({ openForm: false });
  };

  render() {
    const { classes, environment, userExists, errorsCreate } = this.props;
    const { openLogin, openForm } = this.state;
    const errors = errorsCreate;
    const callbackURL = Boolean(environment) ? 'env/'.concat(environment.name) : ''
    return (
      <div className={classes.root}>
        <Button onClick={userExists ? this.handleClickOpenForm : this.handleClickOpenLogin} variant="contained" color="primary" className={classes.buttonStyle}>
          New Discussion
          <Edit className={classes.iconStyle} />
        </Button>
        <Card>
          <List>
            <MessageBoardHead />
          </List>
        </Card>
        <MessageBoardForm environment={environment} envExists={Boolean(environment)} open={openForm} onClose={this.handleCloseForm} errors={errors} />
        <LoginForm open={openLogin} onClose={this.handleCloseLogin} callbackURL={callbackURL} />
      </div>
    );
  }
}

MessageBoard.propTypes = {
  environment: PropTypes.object,
  userExists: PropTypes.bool.isRequired,
  errorsCreate: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
};

const mapStateToProps = state => ({
  userExists: state.user.exists,
  errorsCreate: getErrors(state.errors, types.CREATE_MESSAGEBOARD),
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(MessageBoard);
