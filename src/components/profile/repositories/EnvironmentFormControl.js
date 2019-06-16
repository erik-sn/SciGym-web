import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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

const EnvironmentFormControl = ({
  classes,
  topics,
  topic,
  tag,
  handleChangeTopic,
  handleChange,
  handleAddTag,
}) => {
  return (
    <div className={classes.root}>
      <div className={classes.child}>
        <FormControl className={classes.textField}>
          <InputLabel htmlFor="topic">Category</InputLabel>
          <Select
            value={topic}
            onChange={handleChangeTopic}
            inputProps={{
              name: 'topic',
              id: 'topicsSelect',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {topics.map(topic => (
              <MenuItem key={topic.id} value={topic.id}>
                {topic.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
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
          />
        </FormControl>
      </div>
    </div>
  );
};

EnvironmentFormControl.propTypes = {
  classes: PropTypes.object.isRequired,
  topics: PropTypes.arrayOf(PropTypes.object),
  topic: PropTypes.string,
  tag: PropTypes.string,
  handleChangeTopic: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAddTag: PropTypes.func.isRequired,
};

export default withStyles(styles)(EnvironmentFormControl);
