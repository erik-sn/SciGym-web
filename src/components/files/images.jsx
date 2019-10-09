import React from 'react';
import constants from '../../utils/constants';

// TODO: make svg icons and use SvgIcon as in https://v0.material-ui.com/#/components/svg-icon
export const Banner = () => (
  <img src={constants.BANNER} height="60" width="468" alt="" />
);
export const SciGymLogo = () => (
  <img src={constants.SCIGYM_LOGO} height="150" width="150" alt="" />
);
export const GithubIcon = () => (
  <img src={constants.GITHUB_LOGO} height="48" width="48" alt="" />
);
export const SciGymIcon = () => (
  <img
    src={constants.SCIGYM_LOGO}
    height="37"
    width="37"
    alt=""
    style={{ padding: '5px' }}
  />
);
export const TwitterIcon = () => (
  <img src={constants.TWITTER_LOGO} height="48" width="48" alt="" />
);
export const RLParadigm = () => (
  <img src={constants.RL_PARADIGM} height="360" width="480" alt="" />
);
