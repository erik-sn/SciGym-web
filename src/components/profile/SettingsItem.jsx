import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: '#82B1FF',
    },
  },
});

function SettingsItem({ classes, to, icon, text }) {
  return (
    <MenuItem className={classes.menuItem} component={Link} to={to}>
      <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
      <ListItemText classes={{ primary: classes.primary }} inset primary={text} />
    </MenuItem>
  );
}

SettingsItem.propTypes = {
  classes: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default withStyles(styles)(SettingsItem);
