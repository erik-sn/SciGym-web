import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, CardHeader } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import NoteIcon from '@material-ui/icons/Note';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import Paper from '@material-ui/core/Paper';
import CardActionArea from '@material-ui/core/CardActionArea';
import List from '@material-ui/core/List';
import Chip from '@material-ui/core/Chip';
import LocalOffer from '@material-ui/icons/LocalOffer';

import constants from '../../utils/constants';
import CommentCardActions from './CommentCardActions';
import Markdown from '../Markdown';

const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    maxHeight: '600px',
    overflowY: 'scroll',
  },
  cardStyle: {
    width: '100%',
  },
  logoStyle: {
    flex: '1 1 1',
    marginLeft: 'auto',
    marginRight: 'auto',
    top: '0',
    textAlign: 'center',
    padding: '30px',
    paddingLeft: '30px',
    paddingRight: '0px',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '50px',
    },
  },
  cardContentStyle: {
    flex: '1 1 400px',
    padding: '30px',
    overflowX: 'scroll',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '50px',
    },
  },
  commentContentStyle: {
    borderLeft: '0.1em solid grey',
  },
  commentStyle: {
    whiteSpace: 'pre-line',
  },
  userInfoStyle: {
    margin: theme.spacing.unit * 2
  },
  buttonStyle: {
    margin: theme.spacing.unit,
  },
  buttonPosition: {
    position: 'absolute',
    right: '40px',
    bottom: '25px',
  },
  tagStyle: {
    margin: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing.unit * 0.25,
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
  markdown: {
    padding: `${theme.spacing.unit * 3}px 0`,
  },
  imgStyle: {
    padding: '5px',
    height: '120px',
    width: '120px',
    [theme.breakpoints.up('lg')]: {
      height: '150px',
      width: '150px',
    },
  },
});

class CommentCard extends Component {
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

  handleClickDelete = () => {
    this.handleClose()
  };

  render() {
    const { title, author, created, description, tags } = this.props.messageboard;
    const { userId } = this.props;
    const owner = userId === author.id;
    const date = created.split("T")[0]
    const time = created.split("T")[1].split("+")[0].slice(0, -3) + " CET" // is this okay?
    const avatarUrl = 'https://avatars.githubusercontent.com/'.concat(author.username)
    const githubUrl = 'https://www.github.com/'.concat(author.username)
    const { classes } = this.props;
    return (
      <ListItem className={classes.listStyle}>
        <Card className={classes.cardStyle} raised>
          <div className={classes.root}>
            <Hidden xsDown>
              <div className={classes.logoStyle}>
                <CardActionArea href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <img src={avatarUrl} className={classes.imgStyle} alt="" />
                  <Typography variant="subtitle1" className={classes.userInfoStyle} color="primary">
                    <b>{author.username}</b>
                  </Typography>
                </CardActionArea >
              </div>
            </Hidden>
            <div className={classes.cardContentStyle}>
              <Typography variant="h5" gutterBottom>
                {title}
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
              </Typography>
              <Typography color='textSecondary'>
                <NoteIcon /> by <b>{author.username}</b> on {date}
              </Typography>
              <CardContent className={classes.commentContentStyle}>
                <Markdown key={description.substring(0, 40)} className={classes.markdown}>
                  {description + '\n'}
                </Markdown>
              </CardContent>
              {/* <CardActions>
                  <CommentCardActions
                    classes={classes}
                    owner={owner}
                    handleClickDelete={this.handleClickDelete}
                    handleClickOpen={this.handleClickOpen}
                  />
                </CardActions> */}
            </div>
          </div>
        </Card>
      </ListItem>
    );
  }
}

CommentCard.propTypes = {
  key: PropTypes.string,
  messageboard: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  userId: state.user.exists ? state.user.id : undefined
})

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(CommentCard);
