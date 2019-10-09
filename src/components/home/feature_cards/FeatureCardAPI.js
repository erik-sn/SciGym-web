import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';

import constants from '../../../utils/constants';

const featureCardAPI = ({ classes }) => {
  return (
    <div className={classes.cardStyle}>
      <div className={classes.contentStyle}>
        <Typography variant="h6" className={classes.titleStyle}>
          Science Problems packaged as APIs
        </Typography>
        <Typography variant="subtitle1">
          In Reinforcement Learning an agent interacts with an environment to achieve some goal. Our
          environments encode problems in science packaged as APIs.
        </Typography>
      </div>
      <div className={classes.mediaStyle}>
        <img
          className={classes.imgStyleAPI}
          src={constants.SCIENCE_API}
          alt=""
        />
      </div>
      <Hidden smUp>
        <Divider />
      </Hidden>
    </div>
  );
};

featureCardAPI.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default featureCardAPI;
