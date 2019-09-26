import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  createMessageBoard,
  resetMessageBoardsProps,
  editMessageBoard,
} from '../../actions/messageboards';
import { getErrors } from '../../reducers/errors';
import MessageBoardFormText from './MessageBoardFormText';
import MessageBoardFormControl from './MessageBoardFormControl';
import { isLoading } from '../../reducers/display';
import types from '../../utils/types';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  tagStyle: {
    margin: theme.spacing.unit,
  },
  loadingStyle: {
    margin: 'auto',
    padding: '5px',
  },
});

class MessageBoardForm extends Component {
  constructor(props) {
    super(props);
    const { environment, messageboard } = props;
    const envExists = Boolean(environment);
    const boardExists = Boolean(messageboard)
    this.state = {
      id: boardExists ? messageboard.id : undefined,
      environment: envExists ? environment.id : undefined,
      title: boardExists ? messageboard.title : '',
      description: boardExists ? messageboard.description : '',
      tag: '',
      tags: boardExists && Boolean(messageboard.tags) ? messageboard.tags : [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleDeleteTag = this.handleDeleteTag.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    const { title, description, environment, tags } = this.state;
    const boardExists = Boolean(this.props.messageboard);
    if (boardExists) {
      this.props.editMessageBoard(this.state);
    } else {
      this.props.createMessageBoard(title, description, environment, tags);
    }
  }

  handleChange = title => event => {
    event.preventDefault();
    this.setState({
      [title]: event.target.value,
    });
  };

  handleAddTag = () => {
    const tagArray = this.state.tags;
    if (!(tagArray.includes(this.state.tag) || this.state.tag === '')) {
      this.setState({
        tags: tagArray.concat([this.state.tag]),
        tag: '',
      });
    }
  };

  handleDeleteTag = tag => event => {
    event.preventDefault();
    const tagArray = this.state.tags;
    tagArray.splice(tagArray.indexOf(tag), 1);
    this.setState({
      tag: '',
      tags: tagArray,
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.uploadSuccess !== this.props.uploadSuccess && this.props.uploadSuccess) {
      // this is called many times in a row because the update is not fast enough
      this.props.onClose();
      this.props.resetMessageBoardsProps();
    }
    if (this.state.environment === undefined && Boolean(this.props.environment)) {
      this.setState({ environment: this.props.environment.id })
    }
  }

  render() {
    const { classes, errors, loading } = this.props;
    const { tags } = this.state;
    return (
      <form className={classes.container}>
        <Dialog onClose={this.props.onClose} open={this.props.open} fullWidth>
          <DialogTitle>
            Start a Discussion
          </DialogTitle>
          <MessageBoardFormText
            title={this.state.title}
            description={this.state.description}
            handleChange={this.handleChange}
            errors={errors}
          />
          <MessageBoardFormControl
            tag={this.state.tag}
            handleChange={this.handleChange}
            handleAddTag={this.handleAddTag}
            errors={errors}
          />
          {tags.length > 0 && (
            <List>
              {tags.map(tag => (
                <Chip
                  label={tag}
                  key={tag}
                  onDelete={this.handleDeleteTag(tag)}
                  className={classes.tagStyle}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </List>
          )}
          {loading ? (
            <CircularProgress
              className={classes.loadingStyle}
              size={30}
              disableShrink
              color="primary"
            />
          ) : (
              <Button onClick={this.handleSubmit}>Submit</Button>
            )}
        </Dialog>
      </form>
    );
  }
}

MessageBoardForm.propTypes = {
  createMessageBoard: PropTypes.func.isRequired,
  resetMessageBoardsProps: PropTypes.func.isRequired,
  editMessageBoard: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  environment: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  uploadSuccess: PropTypes.any, // this is either undefined or bool
  loading: PropTypes.bool.isRequired,
  messageboard: PropTypes.any, // this is either undefined or an object
  errors: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
};

function mapStateToProps(state) {
  const errorsCreate = getErrors(state.errors, types.CREATE_MESSAGEBOARD);
  const errorsEdit = getErrors(state.errors, types.EDIT_MESSAGEBOARD);
  const errors = Boolean(errorsCreate) ? errorsCreate : Boolean(errorsEdit) && errorsEdit;
  return {
    uploadSuccess: state.messageboards.uploadSuccess,
    loading:
      isLoading(state.display, types.CREATE_MESSAGEBOARD) ||
      isLoading(state.display, types.EDIT_MESSAGEBOARD),
    errors: errors,
  };
};

const mapDispatchToProps = {
  createMessageBoard,
  resetMessageBoardsProps,
  editMessageBoard,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(MessageBoardForm);
