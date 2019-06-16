import React from 'react';
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

const RepositoryItemFormArea = ({ classes, envExists, handleClickDelete, handleClickOpen }) => {
  return (
    <div className={classes.buttonPosition}>
      {envExists ? (
        <div>
          <Fab
            size="small"
            color="secondary"
            onClick={handleClickDelete}
            className={classes.buttonStyle}
          >
            <Delete />
          </Fab>
          <Fab
            size="small"
            color="primary"
            onClick={handleClickOpen}
            className={classes.buttonStyle}
          >
            <Edit />
          </Fab>
        </div>
      ) : (
        <Fab size="medium" color="primary" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      )}
    </div>
  );
};

RepositoryItemFormArea.propTypes = {
  classes: PropTypes.object.isRequired,
  envExists: PropTypes.bool.isRequired,
  handleClickDelete: PropTypes.func.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
};

export default RepositoryItemFormArea;
