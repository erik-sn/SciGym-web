import React from 'react';
import PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';

import ErrorOutline from '@material-ui/icons/ErrorOutline';
import Done from '@material-ui/icons/Done';

const VerificationChip = ({ classes, scigym, gym }) => {
  return (
    <div className={classes.chipPosition}>
      {scigym ? (
        <div>
          <Chip
            icon={<Done />}
            label="SciGym Native"
            className={classes.tagStyle}
            color="primary"
          />
        </div>
      ) : gym ? (
        <div>
          <Chip
            icon={<Done />}
            label="Gym Verified"
            className={classes.tagStyle}
            color="primary"
            variant="outlined"
          />
        </div>
      ) : (
        <div>
          <Chip
            icon={<ErrorOutline />}
            label="Gym Unverified"
            className={classes.tagStyle}
            color="secondary"
            variant="outlined"
          />
        </div>
      )}
    </div>
  );
};

VerificationChip.propTypes = {
  classes: PropTypes.object.isRequired,
  scigym: PropTypes.bool.isRequired,
  gym: PropTypes.bool.isRequired,
};

export default VerificationChip;
