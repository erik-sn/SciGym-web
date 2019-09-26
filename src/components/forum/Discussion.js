import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import showdown from 'showdown';

import { withStyles, Button, CircularProgress } from '@material-ui/core';
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
import List from '@material-ui/core/List';
import ReplyIcon from '@material-ui/icons/Reply';

import LoginForm from '../auth/LoginForm';
import { getComments } from '../../actions/comments';
import types from '../../utils/types';
import { isLoading } from '../../reducers/display';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';
import MessageBoardComment from './MessageBoardComment';


const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    backgroundColor: 'AliceBlue',
  },
  loadingStyle: {
    position: 'relative',
    margin: 'auto',
    left: '50%',
  },
  loadingContainStyle: {
    paddingTop: '50px',
  },
  content: {
    marginTop: '40px',
    margin: 'auto',
    width: '90%',
    [theme.breakpoints.up('md')]: {
      width: '75%',
    },
    paddingBottom: '50px',
  },
  title: {
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 6,
  },
  gridStyle: {
    paddingTop: '50px',
  },
  gridImg: {
    width: '300px',
    margin: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      width: '200px',
    },
  },
  gridContent: {
    width: '600px',
    margin: theme.spacing.unit,
    [theme.breakpoints.down('md')]: {
      width: '400px',
    },
  },
  uploadButtonStyle: {
    left: '0px',
    margin: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4,
  },
});

class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openReadme: false, // remove?
      openForm: false,
      openLogin: false,
    };
  }

  componentDidUpdate(prevProps) {
    this.props.change && !prevProps.change && this.props.getComments(this.props.messageboard.id)
    this.props.messageboard && this.props.messageboard !== prevProps.messageboard && this.props.getComments(this.props.messageboard.id)
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
    const { classes, messageboard, userExists, comments, loading } = this.props;
    const { openLogin, openForm } = this.state;
    const callbackURL = Boolean(messageboard) ? messageboard.titleUrl : ''
    return (
      <div>
        {messageboard === undefined ? (
          <Typography variant="h6" className={classes.title}>
            There is no discussion here...
            </Typography>
        ) : (
            <div className={classes.root}>
              <div className={classes.content}>
                <Button onClick={userExists ? this.handleClickOpenForm : this.handleClickOpenLogin} variant="contained" color="primary" className={classes.uploadButtonStyle}>
                  Post Reply
                <ReplyIcon className={classes.iconStyle} />
                </Button>
                <MessageBoardComment messageboard={messageboard} />
                {loading ? (
                  <div className={classes.loadingContainStyle}>
                    <CircularProgress
                      className={classes.loadingStyle}
                      size={40}
                      color="primary"
                    />
                  </div>
                ) : (
                    <List>
                      {comments.map(comment => (
                        <React.Fragment key={comment.id}>
                          <CommentCard key={comment.id} comment={comment} messageboard={messageboard} />
                          <Divider />
                        </React.Fragment>
                      ))}
                    </List>
                  )}
              </div>
            </div>
          )}
        <CommentForm messageboard={messageboard} comment={undefined} quote={false} open={openForm} onClose={this.handleCloseForm} />
        <LoginForm open={openLogin} onClose={this.handleCloseLogin} callbackURL={callbackURL} />
      </div>
    );
  }
}

Discussion.propTypes = {
  messageboard: PropTypes.object,
  change: PropTypes.bool.isRequired,
  userExists: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state, ownProps) {
  const { messageboards } = state.messageboards;
  let { env_url, board_url } = ownProps.match.params;
  const discussionUrl = '/env/'.concat(env_url) + '/forum/'.concat(board_url)
  const messageboard = messageboards.find(board => board.titleUrl === discussionUrl)
  const { comments } = state.comments
  return {
    messageboard: messageboard,
    userExists: state.user.exists,
    comments: comments,
    loading: isLoading(state.display, types.GET_COMMENTS_LIST)
  };
}

const mapDispatchToProps = {
  getComments,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(Discussion);
