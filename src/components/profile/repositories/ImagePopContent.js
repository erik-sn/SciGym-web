import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Radio from '@material-ui/core/Radio';

import constants from '../../../utils/constants';

const styles = theme => ({
  root: {
    margin: 'auto',
    height: '155px',
    paddingLeft: '5%',
    paddingRight: '5%',
    backgroundColor: 'AliceBlue',
    paddingTop: theme.spacing.unit * 3,
    maxWidth: '500px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '5%',
      paddingRight: '5%',
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '5%',
      paddingRight: '5%',
    },
  },
  gridStyle: {
    overflow: 'auto',
    overflowX: 'scroll',
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  cardStyle: {
    width: '100px',
  },
  mediaStyle: {
    height: '100px',
  },
  textStyle: {
    margin: theme.spacing.unit,
  },
});

class ImagePopContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAvatar: props.avatar,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = avatar => event => {
    if (event.target.value !== 'default') {
      this.setState({ selectedAvatar: avatar });
      this.props.handleSelect(avatar);
    } else {
      this.setState({ selectedAvatar: null });
      this.props.handleSelect(null);
    }
  };

  render() {
    const { classes, userImages } = this.props;
    if (userImages.length > 0) {
      return (
        <div className={classes.root}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={16}
            className={classes.gridStyle}
          >
            <Grid item key="default">
              <Card className={classes.cardStyle}>
                <CardMedia
                  className={classes.mediaStyle}
                  image={constants.STATIC_URL.concat(constants.SCIGYM_LOGO)}
                >
                  <Radio
                    checked={this.state.selectedAvatar === null}
                    onChange={this.handleChange(null)}
                    value="default"
                    name="radio-button-image"
                    aria-label="default"
                    className={classes.radioStyle}
                  />
                </CardMedia>
              </Card>
            </Grid>
            {userImages.map(image => (
              <Grid item key={image.id}>
                <Card className={classes.cardStyle}>
                  <CardMedia
                    className={classes.mediaStyle}
                    image={constants.STATIC_URL.concat(image.uploadPath)}
                  >
                    <Radio
                      checked={
                        this.state.selectedAvatar !== null
                          ? this.state.selectedAvatar.id === image.id
                          : false
                      }
                      onChange={this.handleChange(image)}
                      value={image.id}
                      name="radio-image-button"
                      aria-label={image.id}
                      className={classes.radioStyle}
                    />
                  </CardMedia>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      );
    } else {
      return (
        <Typography className={classes.textStyle} variant="subtitle1">
          You don't have any images, yet!
        </Typography>
      );
    }
  }
}

ImagePopContent.propTypes = {
  userImages: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSelect: PropTypes.func.isRequired,
  avatar: PropTypes.any, // this is null or an object
};

export default withStyles(styles)(ImagePopContent);
