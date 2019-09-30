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
  createEnvironment,
  editEnvironment,
  resetEnvironmentsProps,
} from '../../../actions/environments';
import { resetMessageBoardsProps } from '../../../actions/messageboards';
import { getUserImages } from '../../../actions/images';
import ImagePreview from './ImagePreview';
import EnvironmentFormText from './EnvironmentFormText';
import EnvironmentFormControl from './EnvironmentFormControl';
import { isLoading } from '../../../reducers/display';
import types from '../../../utils/types';

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

class EnvironmentForm extends Component {
  constructor(props) {
    super(props);
    const { envExists, environment, repository } = props;
    this.state = {
      id: envExists ? environment.id : repository.id,
      name: envExists ? environment.name : repository.name,
      description: envExists ? environment.description : repository.description,
      tag: '',
      tags: envExists && Boolean(environment.tags) ? environment.tags : [],
      topic: envExists && Boolean(environment.topic) ? environment.topic.id : '',
      avatar: envExists ? environment.currentAvatar : null,
      avatarId:
        envExists && Boolean(environment.currentAvatar) ? environment.currentAvatar.id : null,
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleDeleteTag = this.handleDeleteTag.bind(this);
    this.handleChangeTopic = this.handleChangeTopic.bind(this);
  }

  handleSelect = selectedAvatar => {
    if (selectedAvatar !== null) {
      this.setState({
        avatar: selectedAvatar,
        avatarId: selectedAvatar.id,
      });
    } else {
      this.setState({
        avatar: selectedAvatar,
        avatarId: null,
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.props.envExists) {
      this.props.editEnvironment(this.state);
    } else {
      const { name, description, id, tags, topic, avatarId } = this.state;
      this.props.createEnvironment(name, description, id, tags, topic, avatarId);
    }
  };

  handleChange = name => event => {
    event.preventDefault();
    this.setState({
      [name]: event.target.value,
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

  handleChangeTopic = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.uploadSuccess !== this.props.uploadSuccess && this.props.uploadSuccess) {
      // this is called many times in a row because the update is not fast enough
      this.props.onClose();
      this.props.resetEnvironmentsProps();
    }
    if (prevProps.uploadedImage !== this.props.uploadedImage && this.props.uploadedImage) {
      const { uploadedImage } = this.props;
      this.setState({
        avatar: uploadedImage,
        avatarId: uploadedImage.id,
      });
    }
    if (prevProps.uploadMessageBoard !== this.props.uploadMessageBoard && this.props.uploadMessageBoard) {
      // this is called many times in a row because the update is not fast enough
      this.props.resetMessageBoardsProps();
    }
  }

  render() {
    const { classes, repository, topics, errors, loading } = this.props;
    const { tags } = this.state;
    return (
      <form className={classes.container}>
        <Dialog onClose={this.props.onClose} open={this.props.open} fullWidth>
          <DialogTitle>
            {this.props.envExists ? 'Edit Environment' : 'Create Environment'}
          </DialogTitle>
          <ImagePreview avatar={this.state.avatar} handleSelect={this.handleSelect} />
          <EnvironmentFormText
            name={this.state.name}
            description={this.state.description}
            repository={repository}
            handleChange={this.handleChange}
            errors={errors}
          />
          <EnvironmentFormControl
            topics={topics}
            topic={this.state.topic}
            tag={this.state.tag}
            handleChangeTopic={this.handleChangeTopic}
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

EnvironmentForm.propTypes = {
  getUserImages: PropTypes.func.isRequired,
  createEnvironment: PropTypes.func.isRequired,
  editEnvironment: PropTypes.func.isRequired,
  resetEnvironmentsProps: PropTypes.func.isRequired,
  resetMessageBoardsProps: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  repository: PropTypes.object.isRequired,
  environment: PropTypes.object,
  open: PropTypes.bool.isRequired,
  envExists: PropTypes.bool.isRequired,
  topics: PropTypes.arrayOf(PropTypes.object),
  uploadSuccess: PropTypes.any, // this is either undefined or bool
  uploadedImage: PropTypes.any, // this is either undefined or object
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
};

const mapStateToProps = state => ({
  topics: state.topics.topics,
  uploadSuccess: state.environments.uploadSuccess,
  uploadedImage: state.images.uploadedImage,
  uploadMessageBoard: state.messageboards.uploadSuccess,
  loading:
    isLoading(state.display, types.CREATE_ENVIRONMENT) ||
    isLoading(state.display, types.EDIT_ENVIRONMENT),
});

const mapDispatchToProps = {
  getUserImages,
  createEnvironment,
  editEnvironment,
  resetEnvironmentsProps,
  resetMessageBoardsProps,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(EnvironmentForm);
