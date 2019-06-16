import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import types from '../../../utils/types';
import { isLoading } from '../../../reducers/display';
import { getErrors } from '../../../reducers/errors';
import { updateMyProfile } from '../../../actions/user';

const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    paddingBottom: theme.spacing.unit * 4,
  },
  textField: {
    width: 300,
  },
  button: {
    marginTop: theme.spacing.unit,
    width: 250,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

const AccountForm = ({ classes, user, updateMyProfile, isUpdating, errors }) => {
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const saveForm = () => updateMyProfile({ email, firstName, lastName });

  return (
    <div className={classes.root}>
      <TextField
        id="user-name"
        label="Username"
        className={classes.textField}
        margin="normal"
        value={user.username}
        disabled
        error={errors && errors.username}
      />
      <TextField
        id="email"
        label="Email"
        className={classes.textField}
        margin="normal"
        value={email}
        onChange={event => setEmail(event.target.value)}
        error={Boolean(errors && errors.email)}
        helperText={errors && errors.email}
      />
      <TextField
        id="first-name"
        label="First Name"
        className={classes.textField}
        margin="normal"
        value={firstName}
        onChange={event => setFirstName(event.target.value)}
        error={Boolean(errors && errors.firstName)}
        helperText={errors && errors.firstName}
      />
      <TextField
        id="last-name"
        label="Last Name"
        className={classes.textField}
        margin="normal"
        value={lastName}
        onChange={event => setLastName(event.target.value)}
        error={Boolean(errors && errors.lastName)}
        helperText={errors && errors.lastName}
      />
      <Button variant="contained" color="primary" className={classes.button} onClick={saveForm}>
        {isUpdating ? 'Saving...' : 'Save'}
        <SaveIcon className={classes.rightIcon} />
      </Button>
    </div>
  );
};

AccountForm.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateMyProfile: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  isUpdating: isLoading(state.display, types.UPDATE_USER_PROFILE),
  errors: getErrors(state.errors, types.UPDATE_USER_PROFILE),
});

export default compose(
  connect(
    mapStateToProps,
    { updateMyProfile }
  ),
  withStyles(styles)
)(AccountForm);
