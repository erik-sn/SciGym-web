import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import RepositoryItem from './RepositoryItem';

const RepositoryList = ({ classes, emptyGym, gymRepo, notGymRepo }) => {
  return (
    <List>
      <Typography variant="h6" className={classes.title}>
        OpenAI Gym Repositories
      </Typography>
      {!emptyGym ? (
        gymRepo.map(r => (
          <React.Fragment key={r.id}>
            <RepositoryItem key={r.id} repository={r} />
            <Divider />
          </React.Fragment>
        ))
      ) : (
        <React.Fragment>
          <Typography variant="h6" className={classes.title}>
            You don't have any Gym Repositories!
          </Typography>
          <Divider />
        </React.Fragment>
      )}
      <Typography variant="h6" className={classes.title}>
        Other Repositories
      </Typography>
      {notGymRepo.length === 0 ? (
        <React.Fragment>
          <Typography variant="h6" className={classes.title}>
            You don't have any other Repositories!
          </Typography>
          <Divider />
        </React.Fragment>
      ) : (
        notGymRepo.map(r => (
          <React.Fragment key={r.id}>
            <RepositoryItem key={r.id} repository={r} />
            <Divider />
          </React.Fragment>
        ))
      )}
    </List>
  );
};

RepositoryList.propTypes = {
  classes: PropTypes.object.isRequired,
  emptyGym: PropTypes.bool.isRequired,
  gymRepo: PropTypes.arrayOf(PropTypes.object),
  notGymRepo: PropTypes.arrayOf(PropTypes.object),
};

export default RepositoryList;
