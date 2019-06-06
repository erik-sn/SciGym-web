import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

const Notification = ({ classes, notification }) => {
  const [visible, setVisible] = useState(true);
  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setVisible(false);
  };
  if (!notification) return null;
  return (
    <Snackbar
      key={notification.key}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={visible}
      autoHideDuration={6000}
      onClose={handleClose}
      onExited={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{notification.message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
};
const StyledNotification = withStyles(styles)(Notification);

const Notifications = ({ notifications }) => {
  return notifications.map(notification => (
    <StyledNotification key={notification.key} notification={notification} />
  ));
};

Notifications.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  notifications: state.display.notifications,
});
export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Notifications);
