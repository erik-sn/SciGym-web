import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import constants from '../../utils/constants';
import EnvironmentDetailContent from './EnvironmentDetailContent';
import MessageBoard from './MessageBoard';

const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    backgroundColor: 'AliceBlue',
  },
  title: {
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 6,
  },
  gridStyle: {
    paddingTop: '50px',
  },
  gridImg: {
    width: '300px',
    margin: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      width: '200px',
    },
  },
  gridContent: {
    width: '600px',
    margin: theme.spacing.unit,
    [theme.breakpoints.down('md')]: {
      width: '400px',
    },
  },
  imgCardStyle: {
    width: '175px',
    [theme.breakpoints.down('sm')]: {
      width: '150px',
    },
  },
  mediaStyle: {
    height: '175px',
    [theme.breakpoints.down('sm')]: {
      height: '150px',
    },
  },
});

class EnvironmentDetail extends Component {

  render() {
    const { classes, environment } = this.props;
    const { env_url } = this.props.match.params
    let filePath = constants.SCIGYM_LOGO;
    if (!(environment === undefined)) {
      const { currentAvatar } = this.props.environment;
      if (currentAvatar != null) {
        filePath = currentAvatar.filePath;
      }
    }
    return (
      <div>
        {environment === undefined ? (
          <Typography variant="h6" className={classes.title}>
            There is no environment here...
            </Typography>
        ) : (
            <div className={classes.root}>
              <Grid container justify="center" className={classes.gridStyle} spacing={0}>
                <Grid key="image" item className={classes.gridImg}>
                  <Card className={classes.imgCardStyle}>
                    <CardMedia
                      className={classes.mediaStyle}
                      image={constants.STATIC_URL.concat(filePath)}
                    />
                  </Card>
                </Grid>
                <Grid key="content" item className={classes.gridContent}>
                  <EnvironmentDetailContent environment={environment} />
                </Grid>
              </Grid>
              <MessageBoard environment={environment} env_url={env_url} />
            </div>
          )}
      </div>
    );
  }
}

EnvironmentDetail.propTypes = {
  environment: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  const { environments } = state.environments;
  let { env_url } = ownProps.match.params;
  return {
    environment: environments.find(env => env.url === env_url),
  };
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(EnvironmentDetail);
