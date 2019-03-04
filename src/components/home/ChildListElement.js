import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const ChildListElement = ({ topic, handleClick }) => {
  return (
    <List component="div" disablePadding key={topic.id}>
      <ListItem button key={topic.id} onClick={handleClick}>
        <ListItemText inset primary={topic.name} />
      </ListItem>
    </List>
  );
};

export default ChildListElement;
