import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';

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

const MessageBoardFormControl = ({
  classes,
  tag,
  handleChange,
  handleAddTag,
  errors,
}) => {
  return (
    <div className={classes.root}>
      <div className={classes.child}>
        <FormControl className={classes.textField}>
          <InputLabel htmlFor="adornment-tag">Add a Tag</InputLabel>
          <Input
            id="adornment-tag"
            value={tag}
            onChange={handleChange('tag')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="Add tag" onClick={handleAddTag}>
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            }
            error={Boolean(errors && errors.tags)}
          />
          <FormHelperText error={true} id="tag-helper-text">
            {errors && errors.tags}
          </FormHelperText>
        </FormControl>
      </div>
    </div>
  );
};

MessageBoardFormControl.propTypes = {
  classes: PropTypes.object.isRequired,
  tag: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleAddTag: PropTypes.func.isRequired,
  errors: PropTypes.any, // this is either bool or object
};

export default withStyles(styles)(MessageBoardFormControl);
