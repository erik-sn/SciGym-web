import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';

import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import AccountIcon from '@material-ui/icons/AccountBox';
import ForumIcon from '@material-ui/icons/Forum';
import ListIcon from '@material-ui/icons/ViewList';
import ImageIcon from '@material-ui/icons/Image';
import Hidden from '@material-ui/core/Hidden';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import SettingsItem from './SettingsItem';
import DrawerHead from '../home/drawer/DrawerHead';

const drawerWidth = 240;
const styles = theme => ({
  drawerPaper: {
    width: drawerWidth,
    flexShrink: 0,
    paddingTop: '0',
    paddingBottom: '0',
    height: '100%',
  },
});

function Settings({ classes }) {
  const [open, setOpen] = useState(false);
  const toggle = openDrawer => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(openDrawer);
  };
  return (
    <div>
      <Hidden smDown>
        <Paper className={classes.drawerPaper}>
          <DrawerHead />
          <MenuList>
            <SettingsItem to="/profile" text="Repositories" icon={<ListIcon />} />
            <Divider />
            <SettingsItem to="/profile/account" text="Account" icon={<AccountIcon />} />
            <SettingsItem to="/profile/images" text="Images" icon={<ImageIcon />} />
            <SettingsItem to="/profile/messageboards" text="Message Boards" icon={<ForumIcon />} />
          </MenuList>
        </Paper>
      </Hidden>
      <Hidden mdUp>
        <SwipeableDrawer open={open} onClose={toggle(false)} onOpen={toggle(true)}>
          <div className={classes.drawerPaper}>
            <DrawerHead />
            <MenuList>
              <SettingsItem to="/profile" text="Repositories" icon={<ListIcon />} />
              <Divider />
              <SettingsItem to="/profile/account" text="Account" icon={<AccountIcon />} />
              <SettingsItem to="/profile/images" text="Images" icon={<ImageIcon />} />
              <SettingsItem to="/profile/messageboards" text="Message Boards" icon={<ForumIcon />} />
            </MenuList>
          </div>
        </SwipeableDrawer>
      </Hidden>
    </div>
  );
}

Settings.propTypes = {};

export default withStyles(styles)(Settings);
