import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Fab from '@material-ui/core/Fab';

import Delete from '@material-ui/icons/Delete';

import constants from '../../../utils/constants';
import DeleteImage from './DeleteImage';

const ImageCard = ({
  classes,
  image,
  error,
  handleClickDelete,
  handleCloseDelete,
  handleDelete,
  openDelete,
}) => {
  return (
    <Card className={classes.cardStyle}>
      <CardMedia
        className={classes.mediaStyle}
        image={constants.STATIC_URL.concat(image.uploadPath)}
      >
        <div>
          <Fab
            size="small"
            color="secondary"
            onClick={handleClickDelete}
            className={classes.buttonStyle}
          >
            <Delete />
          </Fab>
          <DeleteImage
            handleCloseDelete={handleCloseDelete}
            openDelete={openDelete}
            image={image}
            handleDelete={handleDelete}
            error={error}
            key={image.id}
          />
        </div>
      </CardMedia>
    </Card>
  );
};

ImageCard.propTypes = {
  classes: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
  handleClickDelete: PropTypes.func.isRequired,
  handleCloseDelete: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  openDelete: PropTypes.bool.isRequired,
};

export default ImageCard;
