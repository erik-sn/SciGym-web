import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Fab from '@material-ui/core/Fab';

import Delete from '@material-ui/icons/Delete';

import constants from '../../../utils/constants';
import DeleteImage from './DeleteImage';

class ImageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDelete: false,
    };
    this.handleClickDelete.bind(this);
    this.handleCloseDelete.bind(this);
  }
  handleClickDelete = () => {
    this.setState({ openDelete: true });
  };

  handleCloseDelete = () => {
    this.setState({ openDelete: false });
  };
  render() {
    const { classes, image } = this.props;
    const { openDelete } = this.state;
    return (
      <Card className={classes.cardStyle}>
        <CardMedia
          className={classes.mediaStyle}
          image={constants.MEDIA_URL.concat(image.filePath)}
        >
          <div>
            <Fab
              size="small"
              color="secondary"
              onClick={this.handleClickDelete}
              className={classes.buttonStyle}
            >
              <Delete />
            </Fab>
            <DeleteImage
              handleCloseDelete={this.handleCloseDelete}
              openDelete={openDelete}
              image={image}
              key={image.id}
            />
          </div>
        </CardMedia>
      </Card>
    );
  }
}

ImageCard.propTypes = {
  classes: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
};

export default ImageCard;
