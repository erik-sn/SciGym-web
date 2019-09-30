import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';

import LoginForm from '../auth/LoginForm'
import Logout from '../auth/Logout';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});

function ProfileMenu({ classes, userExists }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(undefined);
  const [openLogin, setOpenLogin] = useState(false);
  const toggle = () => setOpen(!open);
  const close = () => setOpen(false);
  const toggleLogin = () => {
    setOpen(false);
    setOpenLogin(true)
  }
  const closeLogin = () => setOpenLogin(false);
  return (
    <div className={classes.root}>
      <div>
        <Button
          buttonRef={node => setAnchorEl(node)}
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={toggle}
        >
          <AccountCircle />
        </Button>
        <Popper open={open} anchorEl={anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={close}>
                  <MenuList>
                    {userExists ? (
                      <MenuItem onClick={close} component={Link} to="/profile">
                        My Profile
                    </MenuItem>
                    ) : (
                        <MenuItem onClick={toggleLogin}>
                          Login
                    </MenuItem>
                      )
                    }
                    {/* <Login onClick={close} /> */}
                    {userExists && <Logout onClick={close} />}
                    <MenuItem onClick={close} component={Link} to="/impressum">
                      About Us
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <LoginForm open={openLogin} onClose={closeLogin} callbackURL={''} />
    </div>
  );
}

ProfileMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  userExists: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  userExists: state.user.exists,
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(ProfileMenu);
