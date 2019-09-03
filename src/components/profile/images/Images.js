import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { getUserImages } from '../../../actions/images';
import ImageCard from './ImageCard';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 2,
    maxWidth: '600px',
  },
  cardStyle: {
    width: '200px',
  },
  mediaStyle: {
    height: '200px',
  },
  rootGrid: {
    paddingTop: theme.spacing.unit,
    flexGrow: 1,
  },
  buttonStyle: {
    margin: theme.spacing.unit,
  },
});

class Images extends Component {
  render() {
    const { classes, userImages } = this.props;
    if (userImages.length > 0) {
      return (
        <div className={classes.root}>
          <Typography variant="h4" component="h3">
            My Images
          </Typography>
          <Typography component="p">
            You can upload more images when creating environments from your repositories.
          </Typography>
          <Grid
            container
            className={classes.rootGrid}
            justify="flex-start"
            alignItems="flex-start"
            spacing={16}
          >
            {userImages.map(image => (
              <Grid key={image.id} item>
                <ImageCard classes={classes} image={image} />
              </Grid>
            ))}
          </Grid>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <Typography variant="h4" component="h3">
            My Images
          </Typography>
          <Typography component="p">
            You don't have any images! <br />
            Images can be uploaded when you are creating environments from your repositories.
          </Typography>
        </div>
      );
    }
  }
}

Images.propTypes = {
  userImages: PropTypes.arrayOf(PropTypes.object),
  getUserImages: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userImages: state.images.userImages,
});

const mapDispatchToProps = { getUserImages };

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(Images);
