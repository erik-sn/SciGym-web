import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const ExpandMoreLess = ({
  classes,
  allEnvVisible,
  noEnvVisible,
  handleExpandMore,
  handleExpandLess,
}) => {
  return (
    <div className={classes.buttonPos}>
      {allEnvVisible ? (
        <IconButton
          disabled
          variant="contained"
          className={classes.buttonStyle}
          onClick={handleExpandMore}
        >
          <ExpandMoreIcon />
        </IconButton>
      ) : (
        <IconButton variant="contained" className={classes.buttonStyle} onClick={handleExpandMore}>
          <ExpandMoreIcon />
        </IconButton>
      )}
      {noEnvVisible ? (
        <IconButton
          disabled
          variant="contained"
          className={classes.buttonStyle}
          onClick={handleExpandLess}
        >
          <ExpandLessIcon />
        </IconButton>
      ) : (
        <IconButton variant="contained" className={classes.buttonStyle} onClick={handleExpandLess}>
          <ExpandLessIcon />
        </IconButton>
      )}
    </div>
  );
};

ExpandMoreLess.propTypes = {
  classes: PropTypes.object.isRequired,
  allEnvVisible: PropTypes.bool.isRequired,
  noEnvVisible: PropTypes.bool.isRequired,
  handleExpandMore: PropTypes.func.isRequired,
  handleExpandLess: PropTypes.func.isRequired,
};

export default ExpandMoreLess;
