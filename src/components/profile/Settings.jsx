import React from 'react';

import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import AccountIcon from '@material-ui/icons/AccountBox';
import GroupIcon from '@material-ui/icons/Group';
import ListIcon from '@material-ui/icons/ViewList';
import ImageIcon from '@material-ui/icons/Image';

import SettingsItem from './SettingsItem';

const Settings = () => (
  <Paper>
    <MenuList>
      <SettingsItem to="/profile" text="Repositories" icon={<ListIcon />} />
      <Divider />
      <SettingsItem to="/profile/account" text="Account" icon={<AccountIcon />} />
      <SettingsItem to="/profile/images" text="Images" icon={<ImageIcon />} />
      <SettingsItem to="/profile/groups" text="Groups" icon={<GroupIcon />} />
    </MenuList>
  </Paper>
);

Settings.propTypes = {};

export default Settings;
