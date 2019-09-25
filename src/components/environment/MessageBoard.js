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
import Divider from '@material-ui/core/Divider';
import Edit from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';
import MessageBoardHead from './MessageBoardHead';
import MessageBoardForm from './MessageBoardForm';
import LoginForm from '../auth/LoginForm';
import types from '../../utils/types';
import MessageBoardItem from './MessageBoardItem';
import ExpandMoreLess from '../ExpandMoreLess';

const modDisplay = 10;

const styles = theme => ({

  uploadButtonStyle: {
    left: '0px',
    marginBottom: theme.spacing.unit * 4,
  },
  buttonStyle: {
    left: '40%',
  },
  buttonPos: {
    minWidth: '770px',
    [theme.breakpoints.down('xs')]: {
      minWidth: '0px',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '950px',
    },
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
    paddingBottom: '50px',
  },
});

class MessageBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openLogin: false,
      openForm: false,
      visibleBoardsCount: modDisplay,
    };
  }

  handleExpandMore = () => {
    this.setState({ visibleBoardsCount: this.state.visibleBoardsCount + modDisplay });
  };

  handleExpandLess = () => {
    this.setState({ visibleBoardsCount: this.state.visibleBoardsCount - modDisplay });
  };

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
    const { classes, environment, userExists, messageboards, replies } = this.props;
    const { openLogin, openForm } = this.state;
    const callbackURL = Boolean(environment) ? 'env/'.concat(environment.name) : ''
    const all = true ? this.state.visibleBoardsCount >= messageboards.length : false;
    const none = true ? this.state.visibleBoardsCount <= modDisplay : false;
    const visibleBoards = messageboards.slice(0, this.state.visibleBoardsCount);
    return (
      <div className={classes.root}>
        <Button onClick={userExists ? this.handleClickOpenForm : this.handleClickOpenLogin} variant="contained" color="primary" className={classes.uploadButtonStyle}>
          New Discussion
          <Edit className={classes.iconStyle} />
        </Button>
        <Card>
          <List>
            <MessageBoardHead />
            <Divider />
            {visibleBoards.map(board => (
              <React.Fragment key={board.id}>
                <MessageBoardItem key={board.id} messageboard={board} replies={replies[board.id]} />
                <Divider />
              </React.Fragment>
            )
            )}
          </List>
        </Card>
        <ExpandMoreLess
          classes={classes}
          allEnvVisible={all}
          noEnvVisible={none}
          handleExpandMore={this.handleExpandMore}
          handleExpandLess={this.handleExpandLess}
        />
        <MessageBoardForm environment={environment} open={openForm} onClose={this.handleCloseForm} />
        <LoginForm open={openLogin} onClose={this.handleCloseLogin} callbackURL={callbackURL} />
      </div>
    );
  }
}

MessageBoard.propTypes = {
  environment: PropTypes.object,
  messageboards: PropTypes.arrayOf(PropTypes.object),
  replies: PropTypes.object,
  env_name: PropTypes.string.isRequired,
  userExists: PropTypes.bool.isRequired,
};

function mapStateToProps(state, ownProps) {
  const { messageboards, num_comments } = state.messageboards;
  const { env_name } = ownProps;
  return {
    messageboards: messageboards.filter(board => board.environment.name === env_name),
    userExists: state.user.exists,
    replies: num_comments
  };
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(MessageBoard);
