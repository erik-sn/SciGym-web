import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import api from '../../utils/api';
import constants from '../../utils/constants';

const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  logoStyle: {
    flex: '1 1 10px',
    margin: theme.spacing.unit,
    top: '0',
    bottom: '0',
    textAlign: 'center',
  },
  contentStyle: {
    margin: theme.spacing.unit,
  },
  inputStyle: {
    marginTop: theme.spacing.unit * 15,
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing.unit,
    },
  },
  errorStyle: {
    margin: theme.spacing.unit * 2,
  },
});

const FILE_EXTENSIONS = ['png', 'jpg', 'jpeg']; // TODO: get this from API
class ImagePreview extends Component {
  constructor(props) {
    super(props);
    var filePath = '/icons/scigym-logo.png';
    if (props.avatar != null) {
      filePath = props.avatar.filePath.replace(constants.UPLOAD_URL, '');
    }
    this.state = {
      avatar: props.avatar,
      avatarURL: constants.STATIC_URL.concat(filePath),
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.avatar !== this.props.avatar) {
      var filePath = '/icons/scigym-logo.png';
      if (this.props.avatar != null) {
        filePath = this.props.avatar.filePath.replace(constants.UPLOAD_URL, '');
      }
      this.setState({
        avatar: this.props.avatar,
        avatarURL: constants.STATIC_URL.concat(filePath),
        error: null,
      });
    }
  }

  handleFailure = () => {
    this.setState({ error: 'Sorry, upload did NOT succeed!' });
  };

  handleChange(event) {
    event.preventDefault();
    const uploadedFile = event.target.files[0];
    const fileExtension = uploadedFile.name.split('.').pop();
    //2MB limit & specific file extension
    if (uploadedFile.size < 2000000 && FILE_EXTENSIONS.includes(fileExtension)) {
      //upload image
      api
        .createImage(uploadedFile)
        .then(this.props.handleSuccess)
        .catch(this.handleFailure);
    } else {
      this.setState({
        error: `Sorry, avatar size is limited to 2MB and we only accept PNG, JPG, JPEG`,
      });
    }
  }

  render() {
    const { error } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.logoStyle}>
          <img src={this.state.avatarURL} height="150" width="150" alt="" />
        </div>
        <div className={classes.contentStyle}>
          <input type="file" onChange={this.handleChange} className={classes.inputStyle} />
        </div>
        {error ? (
          <Typography variant="h8" color="error" className={classes.errorStyle}>
            {error}
          </Typography>
        ) : null}
      </div>
    );
  }
}

ImagePreview.propTypes = {
  avatar: PropTypes.any,
  userImages: PropTypes.arrayOf(PropTypes.object),
  handleSuccess: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userImages: state.userImages, //TODO: image selection
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(ImagePreview);
