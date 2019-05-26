import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';

import Button from '@material-ui/core/Button';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import Done from '@material-ui/icons/Done';
import LocalOffer from '@material-ui/icons/LocalOffer';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { GithubIcon } from '../files/images';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 4,
  },
  contentItems: {
    marginLeft: '20px',
  },
  tagStyle: {
    margin: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      margin: '3px',
    },
  },
  buttonStyle: {
    margin: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      margin: '0',
    },
  },
  chipPosition: {
    position: 'relative',
    top: '20%',
  },
  dividerStyle: {
    marginBottom: theme.spacing.unit,
  },
});

class EnvironmentDetailContent extends Component {
  render() {
    const { classes } = this.props;
    const { owner, htmlUrl, gym, fork } = this.props.environment.repository;
    const { name, description, scigym, tags, topic } = this.props.environment;
    return (
      <div className={classes.root}>
        <Typography variant="h5" component="h2" gutterBottom>
          {name}
        </Typography>
        <Divider className={classes.dividerStyle} />
        <div className={classes.contentItems}>
          <Typography variant="subtitle1" gutterBottom>
            {description}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Owner: <a href={'https://github.com/'.concat(owner.username)}> {owner.username} </a>{' '}
            {fork ? <b> (forked)</b> : ''}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Category: {topic ? <b>{topic.name}</b> : <b> None </b>}
          </Typography>
          <Grid container spacing={0}>
            <Grid item>
              <Typography variant="subtitle2">
                Tags: {tags.length === 0 && <b> None </b>}
              </Typography>
            </Grid>
            <Grid item>
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
            </Grid>
          </Grid>
          <Grid container spacing={40}>
            <Grid item>
              <Button href={htmlUrl} className={classes.buttonStyle}>
                <GithubIcon />
                Github
              </Button>
            </Grid>
            <Grid item>
              {scigym ? (
                <div className={classes.chipPosition}>
                  <Chip
                    icon={<Done />}
                    label="SciGym Native"
                    className={classes.tagStyle}
                    color="primary"
                  />
                </div>
              ) : gym ? (
                <div className={classes.chipPosition}>
                  <Chip
                    icon={<Done />}
                    label="Gym Verified"
                    className={classes.tagStyle}
                    color="primary"
                    variant="outlined"
                  />
                </div>
              ) : (
                <div className={classes.chipPosition}>
                  <Chip
                    icon={<ErrorOutline />}
                    label="Gym Unverified"
                    className={classes.tagStyle}
                    color="secondary"
                    variant="outlined"
                  />
                </div>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

EnvironmentDetailContent.propTypes = {
  environment: PropTypes.object,
};

export default withStyles(styles)(EnvironmentDetailContent);
