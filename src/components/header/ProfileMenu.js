import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Login from '../auth/Login';
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
  const toggle = () => setOpen(!open);
  const close = () => setOpen(false);
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
                    <Login onClick={close} />
                    {userExists && <Logout onClick={close} />}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
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
