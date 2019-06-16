import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import {
  searchEnvironmentsByTopic,
  resetCategorizedEnvironments,
} from '../../../actions/environments';
import DrawerHead from './DrawerHead';
import SearchBar from '../../header/SearchBar';
import DrawerContentTopics from './DrawerContentTopics';

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
      openTopicList: Array.apply(null, Array(parentTopics.length)).map(() => false),
      error: '',
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.topics.length > prevProps.topics.length) {
      const parentTopics = this.props.topics.filter(topic => !topic.parentTopic);
      this.setState({
        openTopicList: Array.apply(null, Array(parentTopics.length)).map(() => false),
      });
    }
  }

  handleTopClick = (index, id, name) => {
    //TODO: handle FAILURE
    const openList = this.state.openTopicList;
    openList[index] = !openList[index];
    this.setState({ openTopicList: openList });
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
          <DrawerContentTopics
            parentTopics={parentTopics}
            childTopics={childTopics}
            open={this.state.openTopicList}
            handleTopClick={this.handleTopClick}
            handleClick={this.handleClick}
          />
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
