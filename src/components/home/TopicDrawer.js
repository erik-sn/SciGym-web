import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import DrawerContent from './DrawerContent';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    width: drawerWidth,
    flexShrink: 0,
    paddingTop: '0',
    paddingBottom: '0',
    height: '100%',
  },
});

class TopicDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: true,
      error: '',
    };
  }

  toggleDrawer = open => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ openDrawer: open });
  };

  render() {
    const { classes, topics } = this.props;
    return (
      <div className={classes.root}>
        <Hidden mdDown>
          <Paper className={classes.drawerPaper}>
            <DrawerContent topics={topics} />
          </Paper>
        </Hidden>
        <Hidden lgUp>
          <SwipeableDrawer
            open={this.state.openDrawer}
            onClose={this.toggleDrawer(false)}
            onOpen={this.toggleDrawer(true)}
            className={classes.drawerPaper}
          >
            <DrawerContent topics={topics} />
          </SwipeableDrawer>
        </Hidden>
      </div>
    );
  }
}

TopicDrawer.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  topics: state.topics.topics,
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(TopicDrawer);
