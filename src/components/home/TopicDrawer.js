import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';

import { searchEnvironmentsByTopic, resetSearchedEnvironments } from '../../actions/environments';
import DrawerHead from './DrawerHead';
import ChildListElement from './ChildListElement';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'AliceBlue',
  },
  title: {
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 6,
  },
  drawerPaper: {
    width: drawerWidth,
    flexShrink: 0,
    paddingTop: '0',
    paddingBottom: '0',
  },
  wrapper: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  gridStyle: {
    [theme.breakpoints.up('lg')]: {
      width: '100%',
    },
  },
});

class TopicDrawer extends Component {
  constructor(props) {
    super(props);
    const parentTopics = this.props.topics.filter(topic => !topic.parentTopic);
    this.state = {
      open: Array.apply(null, Array(parentTopics.length)).map(() => false),
      error: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.topics.length > prevProps.topics.length) {
      const parentTopics = this.props.topics.filter(topic => !topic.parentTopic);
      this.setState({
        open: Array.apply(null, Array(parentTopics.length)).map(() => false),
      });
    }
  }

  handleTopClick = (index, id) => {
    //TODO: handle FAILURE
    const openList = this.state.open;
    openList[index] = !openList[index];
    this.setState({ open: openList });
    this.props.searchEnvironmentsByTopic(id);
  };

  handleClick = id => {
    //TODO: handle FAILURE
    if (id === 'all') {
      this.props.resetSearchedEnvironments();
    } else this.props.searchEnvironmentsByTopic(id);
  };

  render() {
    const { classes, topics } = this.props;

    const parentTopics = topics.filter(topic => !topic.parentTopic);
    const childTopics = topics.filter(topic => topic.parentTopic);
    return (
      <Hidden mdDown>
        <Paper className={classes.drawerPaper}>
          <DrawerHead />
          <Typography variant="h5" className={classes.title}>
            Search Categories
          </Typography>
          <MenuList>
            <ListItem button key={'all'} onClick={() => this.handleClick('all')}>
              <ListItemText primary={'Recent Environments'} />
            </ListItem>
            <Divider />
            {parentTopics.map((parentTopic, index) => (
              <div key={index}>
                <ListItem
                  button
                  key={parentTopic.id}
                  onClick={() => this.handleTopClick(index, parentTopic.id)}
                >
                  <ListItemText primary={parentTopic.name} />
                  {this.state.open[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open[index]} timeout="auto" unmountOnExit>
                  {childTopics.map(
                    topic =>
                      topic.parentTopic.id === parentTopic.id && (
                        <ChildListElement
                          key={topic.id}
                          topic={topic}
                          handleClick={() => this.handleClick(topic.id)}
                        />
                      )
                  )}
                </Collapse>
                <Divider />
              </div>
            ))}
          </MenuList>
        </Paper>
      </Hidden>
    );
  }
}

TopicDrawer.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.object),
  searchEnvironmentsByTopic: PropTypes.func.isRequired,
  resetSearchedEnvironments: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  topics: state.topics.topics,
});

const mapDispatchToProps = {
  searchEnvironmentsByTopic,
  resetSearchedEnvironments,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(TopicDrawer);
