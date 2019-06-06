import React, { Component } from 'react';
import PropTypes from 'prop-types';
import showdown from 'showdown';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

import { GithubIcon } from '../../files/images';
import constants from '../../../utils/constants';
import VerificationChip from '../../VerificationChip';
import EnvironmentItemContent from './EnvironmentItemContent';

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

  render() {
    const { owner, htmlUrl, gym, fork } = this.props.environment.repository;
    const { name, description, scigym, tags, topic, currentAvatar } = this.props.environment;
    const { classes } = this.props;
    var filePath = constants.SCIGYM_LOGO;
    if (currentAvatar != null) {
      filePath = currentAvatar.filePath.replace(constants.UPLOAD_URL, '');
    }
    var converter = new showdown.Converter();
    converter.setFlavor('github');
    return (
      <ListItem className={classes.listStyle}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Card className={classes.cardStyle} raised>
            <div className={classes.root}>
              <div className={classes.logoStyle}>
                <img src={constants.STATIC_URL.concat(filePath)} height="150" width="150" alt="" />
              </div>
              <div className={classes.cardContentStyle}>
                <CardActionArea component={Link} to={'/env/' + name}>
                  <EnvironmentItemContent
                    classes={classes}
                    name={name}
                    description={description}
                    fork={fork}
                    owner={owner}
                    topic={topic}
                    tags={tags}
                  />
                </CardActionArea>
                <CardActions>
                  <Button href={htmlUrl} className={classes.buttonStyle}>
                    <GithubIcon />
                    Github
                  </Button>
                  <VerificationChip classes={classes} scigym={scigym} gym={gym} />
                </CardActions>
              </div>
            </div>
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
