import React, { Component } from 'react';
import PropTypes from 'prop-types';
import showdown from 'showdown';
import classnames from 'classnames';

import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles, Collapse, IconButton } from '@material-ui/core';
import LocalOffer from '@material-ui/icons/LocalOffer';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import Done from '@material-ui/icons/Done';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Slide from '@material-ui/core/Slide';

import { SciGymLogo, GithubIcon } from '../files/images';

const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  cardStyle: {
    width: '100%',
  },
  logoStyle: {
    flex: '1 1 10px',
    margin: 'auto',
    top: '0',
    bottom: '0',
    textAlign: 'center',
  },
  cardContentStyle: {
    flex: '1 1 400px',
  },
  buttonStyle: {
    margin: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      margin: '0',
    },
  },
  tagStyle: {
    margin: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      margin: '0',
    },
  },
  buttonPosition: {
    position: 'absolute',
    right: '40px',
    bottom: '25px',
  },
  readmeStyle: {
    margin: theme.spacing.unit,
    textAlign: 'left',
  },
  expandPosition: {
    position: 'absolute',
    right: '40px',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    position: 'absolute',
    right: '40px',
    [theme.breakpoints.down('xs')]: {
      right: '30px',
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  paperStyle: {
    maxHeight: '500px',
    overflow: 'scroll',
    maxWidth: '800px',
    align: 'center',
    margin: 'auto',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '320px',
      maxHeight: '320px',
    },
  },
  listStyle: {
    minWidth: '770px',
    [theme.breakpoints.down('xs')]: {
      minWidth: '0px',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '950px',
    },
  },
});

class EnvironmentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: '',
    };
  }

  handleClickOpen = () => {
    const newStateOpen = !this.state.open;
    this.setState({
      open: newStateOpen,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleFailure = () => {
    this.setState({ error: 'Problems!' });
  };

  render() {
    const { owner, htmlUrl, readme, gym } = this.props.environment.repository;
    const { name, description, tags } = this.props.environment;
    const topicName = this.props.environment.topic.name;
    const { classes } = this.props;
    var converter = new showdown.Converter();
    converter.setFlavor('github');
    return (
      <ListItem className={classes.listStyle}>
        {/*slide could be better done*/}
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Card className={classes.cardStyle} raised>
            <div className={classes.root}>
              <div className={classes.logoStyle}>
                {/* add pictures */}
                <SciGymLogo />
              </div>
              <div className={classes.cardContentStyle}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {name}
                  </Typography>
                  <Typography variant="subheading" gutterBottom>
                    {description}
                  </Typography>
                  <Typography variant="subheading" gutterBottom>
                    Owner:{' '}
                    <a href={'https://github.com/'.concat(owner.username)}> {owner.username} </a>
                  </Typography>
                  <Typography variant="subheading" gutterBottom>
                    Category: <b>{topicName}</b>
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
                <CardActions>
                  <Button href={htmlUrl} className={classes.buttonStyle}>
                    <GithubIcon />
                    Github
                  </Button>
                  <IconButton
                    onClick={this.handleClickOpen}
                    className={classnames(classes.expand, {
                      [classes.expandOpen]: this.state.open,
                    })}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                  {gym ? (
                    <div className={classes.chipPosition}>
                      <Chip
                        icon={<Done />}
                        label="Gym Verified"
                        className={classes.tagStyle}
                        color="primary"
                      />
                    </div>
                  ) : (
                    <div className={classes.chipPosition}>
                      <Chip
                        icon={<ErrorOutline />}
                        label="Gym Unverified"
                        className={classes.tagStyle}
                        color="secondary"
                      />
                    </div>
                  )}
                </CardActions>
              </div>
            </div>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit stile={{ width: '500px' }}>
              <Paper className={classes.paperStyle}>
                <div
                  dangerouslySetInnerHTML={{ __html: converter.makeHtml(atob(readme)) }}
                  className={classes.readmeStyle}
                />
              </Paper>
            </Collapse>
          </Card>
        </Slide>
      </ListItem>
    );
  }
}

EnvironmentItem.propTypes = {
  key: PropTypes.string,
  environment: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnvironmentItem);
