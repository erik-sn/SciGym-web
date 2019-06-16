import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import CardContent from '@material-ui/core/CardContent';

import LocalOffer from '@material-ui/icons/LocalOffer';

const EnvironmentItemContent = ({ classes, name, description, fork, owner, topic, tags }) => {
  return (
    <CardContent>
      <Typography variant="h5" component="h2" gutterBottom>
        {name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {description}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Owner: {owner.username} {fork ? <b> (forked)</b> : ''}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Category: {topic ? <b>{topic.name}</b> : <b> None </b>}
      </Typography>
      <List>
        {tags.map(tag => (
          <Chip
            icon={<LocalOffer />}
            label={tag}
            key={tag}
            clickable
            className={classes.tagStyle}
            color="primary"
            variant="outlined"
          />
        ))}
      </List>
    </CardContent>
  );
};

EnvironmentItemContent.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  fork: PropTypes.bool.isRequired,
  owner: PropTypes.object.isRequired,
  topic: PropTypes.object,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default EnvironmentItemContent;
