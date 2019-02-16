import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

import api from '../../utils/api';
import { getEnvironments } from '../../actions/environments';

const styles = theme => ({
  root: {
    flex: 1,
  },
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
});

class EnvironmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.envExists ? props.environment.id : props.repository.id,
      name: props.envExists ? props.environment.name : props.repository.name,
      description: props.envExists ? props.environment.description : props.repository.description,
      tag: '',
      tags: props.envExists && Boolean(props.environment.tags) ? props.environment.tags : [],
      error: '',
    };
    this.getEnvironments = this.getEnvironments.bind(this);
  }

  getEnvironments() {
    this.props.getEnvironments();
  }

  handleClose = () => {
    this.props.onClose();
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.props.envExists) {
      api
        .editEnvironment(this.state)
        .then(this.handleSuccess)
        .catch(this.handleFailure);
    } else {
      const { name, description, id, tags } = this.state;
      api
        .createEnvironment(name, description, id, tags)
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
    this.setState({ error: 'Request did NOT succeed!' });
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

  render() {
    const { classes } = this.props;
    const { repository } = this.props;
    const { error } = this.state;
    const { tags } = this.state;
    return (
      <form className={classes.container}>
        <Dialog onClose={this.handleClose} open={this.props.open} fullWidth>
          <DialogTitle>
            {this.props.envExists ? 'Edit Environment' : 'Create Environment'}
          </DialogTitle>
          <TextField
            id="filled-name"
            label="Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
            variant="filled"
          />
          <TextField
            id="filled-full-description"
            label="Description"
            className={classes.textField}
            value={Boolean(this.state.description) ? this.state.description : ''}
            onChange={this.handleChange('description')}
            multiline
            margin="normal"
            variant="filled"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            disabled
            id="filled-disabled-owner"
            label="Owner"
            className={classes.textField}
            defaultValue={repository.owner.username}
            margin="normal"
            variant="filled"
          />
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="adornment-tag">Add a Tag</InputLabel>
            <Input
              id="adornment-tag"
              value={this.state.tag}
              onChange={this.handleChange('tag')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="Add tag" onClick={this.handleAddTag}>
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
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
          <Button onClick={this.handleSubmit}>Submit</Button>
          {error ? (
            <Typography variant="h6" color="error">
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
  onClose: PropTypes.func.isRequired,
  repository: PropTypes.object.isRequired,
  environment: PropTypes.object,
  open: PropTypes.bool.isRequired,
  envExists: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({});
const mapDispatchToProps = {
  getEnvironments,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(EnvironmentForm);
