import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';

import constants from '../../../utils/constants';

const featureCardRL = ({ classes }) => {
  return (
    <div className={classes.cardStyle}>
      <div className={classes.contentStyle}>
        <Typography variant="h6" className={classes.titleStyle}>
          Reinforcement Learning for Science
        </Typography>
        <Typography variant="subtitle1">
          SciGym is a resource for facilitating the development of reinforcement learning based
          solutions to problems in physics and other sciences.
        </Typography>
      </div>
      <div className={classes.mediaStyle}>
        <img
          className={classes.imgStyleRL}
          src={constants.SCIENCE_RL}
          alt=""
        />
      </div>
      <Hidden smUp>
        <Divider />
      </Hidden>
    </div>
  );
};

featureCardRL.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default featureCardRL;
