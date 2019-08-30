import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

import api from '../../../utils/api';
import { getEnvironments } from '../../../actions/environments';
import { getUserImages } from '../../../actions/images';
import ImagePreview from './ImagePreview';
import EnvironmentFormText from './EnvironmentFormText';
import EnvironmentFormControl from './EnvironmentFormControl';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing.unit * 2,
  },
  tagStyle: {
    margin: theme.spacing.unit,
  },
  errorStyle: {
    margin: theme.spacing.unit * 2,
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
      error: '',
      topic: envExists && Boolean(environment.topic) ? environment.topic.id : '',
      avatar: envExists ? environment.currentAvatar : null,
      avatarId:
        envExists && Boolean(environment.currentAvatar) ? environment.currentAvatar.id : null,
      checked: false,
    };
    this.getEnvironments = this.getEnvironments.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  getEnvironments() {
    this.props.getEnvironments();
  }

  handleClose = () => {
    this.props.onClose();
  };

  //set state.avatar to image
  handleUploadSuccess = response => {
    this.props.getUserImages();
    this.setState({
      avatar: response.data,
      avatarId: response.data.id,
    });
  };

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
      api
        .editEnvironment(this.state)
        .then(this.handleSuccess)
        .catch(this.handleFailure);
    } else {
      const { name, description, id, tags, topic, avatarId } = this.state;
      api
        .createEnvironment(name, description, id, tags, topic, avatarId)
        .then(this.handleSuccess)
        .catch(this.handleFailure);
    }
  };

  handleSuccess = () => {
    this.handleClose();
    api.environments().then(json => {
      this.props.getEnvironments(json.data);
    });
  };

  handleFailure = () => {
    this.setState({ error: 'Sorry, submission did NOT succeed!' });
  };

  handleChange = name => event => {
    event.preventDefault();
    this.setState({
      [name]: event.target.value,
    });
  };

  handleAddTag = () => {
    const tagArray = this.state.tags;
    if (tagArray.includes(this.state.tag) || this.state.tag === '') {
      this.setState({ error: 'Tag invalid!' });
    } else {
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

  handleCheck = event => {
    this.setState({ checked: event.target.checked })
  }

  render() {
    const { classes, repository, topics } = this.props;
    const { error, tags, checked } = this.state;
    return (
      <form className={classes.container}>
        <Dialog onClose={this.handleClose} open={this.props.open} fullWidth>
          <DialogTitle>
            {this.props.envExists ? 'Edit Environment' : 'Create Environment'}
          </DialogTitle>
          <ImagePreview
            avatar={this.state.avatar}
            handleSuccess={this.handleUploadSuccess}
            handleSelect={this.handleSelect}
          />
          <EnvironmentFormText
            name={this.state.name}
            description={this.state.description}
            repository={repository}
            handleChange={this.handleChange}
          />
          <EnvironmentFormControl
            topics={topics}
            topic={this.state.topic}
            tag={this.state.tag}
            handleChangeTopic={this.handleChangeTopic}
            handleChange={this.handleChange}
            handleAddTag={this.handleAddTag}
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
          {/* TODO: Check also for image upload. */}
          <Typography className={classes.textField}>
            <Checkbox checked={checked} onChange={this.handleCheck} value="policy" />
            I agree to the <Link to="/policy/private-policy">Private Policy</Link> and <Link to="/policy/terms-and-conditions">Terms and Conditions</Link>
          </Typography>
          {checked ? (
            <Button onClick={this.handleSubmit}>Submit</Button>
          ) : (
              <Button disabled>Submit</Button>
            )}
          {error ? (
            <Typography variant="subtitle1" color="error" className={classes.errorStyle}>
              {error}
            </Typography>
          ) : null}
        </Dialog>
      </form>
    );
  }
}

EnvironmentForm.propTypes = {
  getEnvironments: PropTypes.func.isRequired,
  getUserImages: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  repository: PropTypes.object.isRequired,
  environment: PropTypes.object,
  open: PropTypes.bool.isRequired,
  envExists: PropTypes.bool.isRequired,
  topics: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  topics: state.topics.topics,
});

const mapDispatchToProps = {
  getEnvironments,
  getUserImages,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(EnvironmentForm);
