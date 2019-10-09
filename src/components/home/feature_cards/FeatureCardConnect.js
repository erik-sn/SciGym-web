import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import constants from '../../../utils/constants';

const featureCardRL = ({ classes }) => {
  return (
    <div className={classes.cardStyle}>
      <div className={classes.contentStyle}>
        <Typography variant="h6" className={classes.titleStyle}>
          Connecting Computer Science and other Disciplines
        </Typography>
        <Typography variant="subtitle1">
          SciGym is an attempt to stimulate an open and meaningful exchange between computer
          scientists and researchers in other disciplines.
        </Typography>
      </div>
      <div className={classes.mediaStyle}>
        <img
          className={classes.imgStyleConnect}
          src={constants.SCIENCE_CPU}
          alt=""
        />
      </div>
    </div>
  );
};

featureCardRL.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default featureCardRL;
