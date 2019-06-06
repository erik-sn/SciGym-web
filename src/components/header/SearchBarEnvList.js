import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

const SearchBarEnvList = ({ environments, handleClose }) => {
  return (
    <MenuList
      subheader={
        <ListSubheader disableSticky component="div">
          Environment names
        </ListSubheader>
      }
    >
      <Divider />
      {environments.length === 0 && (
        <MenuItem disabled key="0">
          No environment found
        </MenuItem>
      )}
      {environments.length > 0 &&
        environments.map(env => (
          <MenuItem
            key={env.id}
            value={env.name}
            component={Link}
            to={'/env/' + env.name}
            onClick={handleClose}
          >
            {env.name}
          </MenuItem>
        ))}
    </MenuList>
  );
};

SearchBarEnvList.propTypes = {
  environments: PropTypes.arrayOf(PropTypes.object),
  handleClose: PropTypes.func.isRequired,
};

export default SearchBarEnvList;
