import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Markdown from './Markdown';

const styles = theme => ({
  root: {
    margin: 'auto',
    paddingLeft: '10%',
    paddingRight: '10%',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0%',
      paddingRight: '0%',
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '10%',
      paddingRight: '10%',
    },
  },
  card: {
    maxWidth: '100%',
    marginLeft: theme.spacing.unit * 10,
    marginRight: theme.spacing.unit * 10,
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing.unit * 1,
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing.unit * 15,
      marginRight: theme.spacing.unit * 15,
    },
  },
  media: {
    height: 0,
    paddingTop: '75%',
  },
  title: {
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 6,
  },
  markdown: {
    padding: `${theme.spacing.unit * 3}px 0`,
  },
});

class Contribute extends Component {
  state = {
    markdown: '',
  };
  componentDidMount() {
    const mdPath = require('./contribute.md');

    fetch(mdPath)
      .then(response => {
        return response.text();
      })
      .then(text => {
        this.setState({
          markdown: text,
        });
      });
  }
  render() {
    const { markdown } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h5" className={classes.title}>
          How to contribute to SciGym?
        </Typography>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="http://localhost:8000/static/images/RLParadigm.gif"
            title="RL Paradigm"
          />
        </Card>
        <Markdown key={markdown.substring(0, 40)} className={classes.markdown}>
          {markdown}
        </Markdown>
      </div>
    );
  }
}

Contribute.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contribute);
