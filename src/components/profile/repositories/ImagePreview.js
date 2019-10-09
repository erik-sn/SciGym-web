import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import constants from '../../../utils/constants';
import ImagePopContent from './ImagePopContent';
import { createImage } from '../../../actions/images';
import { isLoading } from '../../../reducers/display';
import types from '../../../utils/types';

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
  imageUploadText: {
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing.unit,
    },
  },
  loadingStyle: {
    padding: '70px 0',
  },
  errorStyle: {
    margin: theme.spacing.unit * 2,
  },
});

const MAX_FILE_SIZE_bytes = 2000000;

class ImagePreview extends Component {
  constructor(props) {
    super(props);
    let filePath = constants.SCIGYM_LOGO;
    if (props.avatar != null) {
      filePath = props.avatar.url;
    }
    this.state = {
      avatar: props.avatar,
      avatarURL: filePath,
      error: null,
      anchorEl: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.avatar !== this.props.avatar) {
      let filePath = constants.SCIGYM_LOGO;
      if (this.props.avatar != null) {
        filePath = this.props.avatar.url;
      }
      this.setState({
        avatar: this.props.avatar,
        avatarURL: constants.MEDIA_URL.concat(filePath),
        error: null,
      });
    }
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleSelect = selectedAvatar => {
    this.props.handleSelect(selectedAvatar);
  };

  handleChange = imageConfig => event => {
    event.preventDefault();
    const uploadedFile = event.target.files[0];
    const fileExtension = uploadedFile.name.split('.').pop().toLowerCase();

    console.log(uploadedFile.size);
    //2MB limit & specific file extension
    let error;
    if (uploadedFile.size > MAX_FILE_SIZE_bytes) {
      error = `Sorry, avatar size is limited to 2MB.`;
    } else if (!imageConfig.includes('.'.concat(fileExtension))) {
      error = `Incorrect file extension. we only accept ${imageConfig.join()}`;
    }

    if (error) {
      this.setState({ error });
    } else {
      this.props.createImage(uploadedFile);
    }
  };

  render() {
    const { error, anchorEl } = this.state;
    const { classes, userImages, imageConfig, loading } = this.props;
    const open = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <div className={classes.logoStyle}>
          {loading ? (
            <CircularProgress
              className={classes.loadingStyle}
              size={50}
              disableShrink
              color="primary"
            />
          ) : (
            <img src={this.state.avatarURL} height="150" width="150" alt="" />
          )}
        </div>
        <div className={classes.contentStyle}>
          <Button
            color="primary"
            aria-owns={open ? 'simple-popper' : undefined}
            aria-haspopup="true"
            variant="contained"
            onClick={this.handleClick}
          >
            My Images
          </Button>
          <Typography className={classes.imageUploadText} variant="h6">
            Upload new image
          </Typography>
          <input type="file" onChange={this.handleChange(imageConfig)} />
        </div>
        <Popover
          id="userImages-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <ImagePopContent
            userImages={userImages}
            avatar={this.state.avatar}
            handleSelect={this.handleSelect}
          />
        </Popover>
        {error ? (
          <Typography variant="subtitle1" color="error" className={classes.errorStyle}>
            {error}
          </Typography>
        ) : null}
      </div>
    );
  }
}

ImagePreview.propTypes = {
  avatar: PropTypes.any, // this is null or an object
  userImages: PropTypes.arrayOf(PropTypes.object),
  handleSelect: PropTypes.func.isRequired,
  imageConfig: PropTypes.arrayOf(PropTypes.string),
  createImage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  userImages: state.images.userImages,
  imageConfig: state.images.imageConfig,
  loading: isLoading(state.display, types.CREATE_IMAGE),
});
const mapDispatchToProps = {
  createImage,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(ImagePreview);
