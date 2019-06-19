import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import showdown from 'showdown';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';

import constants from '../../utils/constants';
import EnvironmentDetailContent from './EnvironmentDetailContent';

const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  title: {
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 6,
  },
  gridStyle: {
    paddingTop: '50px',
    backgroundColor: 'AliceBlue',
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

  readmeCardContent: {
    display: 'flex',
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  readmeStyle: {
    margin: theme.spacing.unit,
    textAlign: 'left',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    position: 'relative',
    left: '90%',
    top: '-10px',
    [theme.breakpoints.down('xs')]: {
      left: '80%',
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  readmePaperStyle: {
    maxHeight: '500px',
    overflow: 'scroll',
    maxWidth: '700px',
    align: 'center',
    margin: 'auto',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '320px',
      maxHeight: '320px',
    },
  },
  readmeCardStyle: {
    marginTop: '40px',
    margin: 'auto',
    width: '90%',
    [theme.breakpoints.up('md')]: {
      width: '75%',
    },
    backgroundColor: 'AliceBlue',
    paddingBottom: '0px',
  },
});

class EnvironmentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openReadme: false,
    };
    this.converter = new showdown.Converter();
    this.converter.setFlavor('github');
  }

  handleClickOpen = () => {
    const newStateOpen = !this.state.openReadme;
    this.setState({
      openReadme: newStateOpen,
    });
  };

  handleClose = () => {
    this.setState({ openReadme: false });
  };

  render() {
    const { classes, environment } = this.props;
    let readme = '';
    let filePath = constants.SCIGYM_LOGO;
    if (!(environment === undefined)) {
      readme = this.props.environment.repository.readme;
      const { currentAvatar } = this.props.environment;
      if (currentAvatar != null) {
        filePath = currentAvatar.uploadPath;
      }
    }
    return (
      <div>
        <div className={classes.root}>
          {environment === undefined ? (
            <Typography variant="h6" className={classes.title}>
              No environment found
            </Typography>
          ) : (
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
          )}
        </div>
        <Card className={classes.readmeCardStyle} raised>
          <CardContent className={classes.readmeCardContent}>
            <IconButton
              onClick={this.handleClickOpen}
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.openReadme,
              })}
            >
              <ExpandMoreIcon />
            </IconButton>
            <Typography variant="subtitle1">README</Typography>
          </CardContent>
          <Collapse in={this.state.openReadme} timeout="auto" unmountOnExit>
            <Paper className={classes.readmePaperStyle}>
              <div
                dangerouslySetInnerHTML={{ __html: this.converter.makeHtml(atob(readme)) }}
                className={classes.readmeStyle}
              />
            </Paper>
          </Collapse>
        </Card>
      </div>
    );
  }
}

EnvironmentDetail.propTypes = {
  environment: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  const { environments } = state.environments;
  const { env_name } = ownProps.match.params;
  return {
    environment: environments.find(env => env.name === env_name),
  };
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(EnvironmentDetail);
