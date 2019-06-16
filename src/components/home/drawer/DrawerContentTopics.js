import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

import ChildListElement from './ChildListElement';

const DrawerContentTopics = ({ parentTopics, childTopics, open, handleTopClick, handleClick }) => {
  return (
    <div>
      {parentTopics.map((parentTopic, index) => (
        <div key={index}>
          <ListItem
            button
            key={parentTopic.id}
            onClick={() => handleTopClick(index, parentTopic.id, parentTopic.name)}
          >
            <ListItemText primary={parentTopic.name} />
            {open[index] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[index]} timeout="auto" unmountOnExit>
            {childTopics.map(
              topic =>
                topic.parentTopic.id === parentTopic.id && (
                  <ChildListElement
                    key={topic.id}
                    topic={topic}
                    handleClick={() => handleClick(topic.id, topic.name)}
                  />
                )
            )}
          </Collapse>
          <Divider />
        </div>
      ))}
    </div>
  );
};

DrawerContentTopics.propTypes = {
  parentTopics: PropTypes.arrayOf(PropTypes.object),
  childTopics: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.arrayOf(PropTypes.bool).isRequired,
  handleTopClick: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default DrawerContentTopics;
