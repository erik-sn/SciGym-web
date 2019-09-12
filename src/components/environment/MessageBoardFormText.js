import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    width: '100%',
  },
  child: {
    width: 'auto',
    margin: theme.spacing.unit * 2,
  },
  textField: {
    width: '100%',
  },
});

const MessageBoardFormText = ({ classes, title, description, handleChange, errors }) => {
  return (
    <div className={classes.root}>
      <div className={classes.child}>
        <TextField
          id="filled-title"
          label="Title"
          className={classes.textField}
          value={title}
          onChange={handleChange('title')}
          margin="normal"
          variant="filled"
          error={Boolean(errors && errors.title)}
          helperText={errors && errors.title}
        />
      </div>
      <div className={classes.child}>
        <TextField
          id="filled-full-description"
          label="Leave a comment"
          className={classes.textField}
          value={Boolean(description) ? description : ''}
          onChange={handleChange('description')}
          multiline
          rows={10}
          margin="normal"
          variant="filled"
          error={Boolean(errors && errors.description)}
          helperText={errors && errors.description}
        />
      </div>
    </div>
  );
};

MessageBoardFormText.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.any, // this is either bool or object
};

export default withStyles(styles)(MessageBoardFormText);
