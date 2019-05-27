import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import {
  searchEnvironmentsByTopic,
  resetCategorizedEnvironments,
} from '../../actions/environments';
import DrawerHead from './DrawerHead';
import ChildListElement from './ChildListElement';
import SearchBar from '../header/SearchBar';

const drawerWidth = 240;
const styles = theme => ({
  root: {
    width: drawerWidth,
    flexShrink: 0,
    paddingTop: '0',
    paddingBottom: '0',
  },
  title: {
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 6,
  },
});

class DrawerContent extends Component {
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

  handleTopClick = (index, id, name) => {
    //TODO: handle FAILURE
    const openList = this.state.open;
    openList[index] = !openList[index];
    this.setState({ open: openList });
    this.props.searchEnvironmentsByTopic(id, name);
  };

  handleClick = (id, name) => {
    //TODO: handle FAILURE
    if (id === 'all') {
      this.props.resetCategorizedEnvironments();
    } else this.props.searchEnvironmentsByTopic(id, name);
  };
  render() {
    const { classes, topics } = this.props;
    const parentTopics = topics.filter(topic => !topic.parentTopic);
    const childTopics = topics.filter(topic => topic.parentTopic);
    return (
      <div className={classes.root}>
        <DrawerHead />
        <Hidden smUp>
          <SearchBar />
        </Hidden>
        <Typography variant="h5" className={classes.title}>
          Search Categories
        </Typography>
        <MenuList>
          <ListItem button key={'all'} onClick={() => this.handleClick('all', undefined)}>
            <ListItemText primary={'Home'} />
          </ListItem>
          <Divider />
          {parentTopics.map((parentTopic, index) => (
            <div key={index}>
              <ListItem
                button
                key={parentTopic.id}
                onClick={() => this.handleTopClick(index, parentTopic.id, parentTopic.name)}
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
                        handleClick={() => this.handleClick(topic.id, topic.name)}
                      />
                    )
                )}
              </Collapse>
              <Divider />
            </div>
          ))}
        </MenuList>
      </div>
    );
  }
}
DrawerContent.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.object),
  searchEnvironmentsByTopic: PropTypes.func.isRequired,
  resetCategorizedEnvironments: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   environments: state.environments.environments,
// });

const mapDispatchToProps = {
  searchEnvironmentsByTopic,
  resetCategorizedEnvironments,
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(styles)
)(DrawerContent);
