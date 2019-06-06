import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';

import EnvironmentItem from './environment_item/EnvironmentItem';
import Hero from './hero/Hero';
import TopicDrawer from './drawer/TopicDrawer';
import FeatureCards from './feature_cards/FeatureCards';
import ExpandMoreLess from '../ExpandMoreLess';

const modDisplay = 10;

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'AliceBlue',
  },
  title: {
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 6,
  },
  wrapper: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  gridStyle: {
    [theme.breakpoints.up('lg')]: {
      width: '80%',
    },
  },
  emptyStyle: {
    minWidth: '770px',
    [theme.breakpoints.down('xs')]: {
      minWidth: '0px',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '950px',
    },
  },
  buttonStyle: {
    left: '40%',
  },
  buttonPos: {
    minWidth: '770px',
    [theme.breakpoints.down('xs')]: {
      minWidth: '0px',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '950px',
    },
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shownEnv: modDisplay,
    };
  }

  handleExpandMore = () => {
    var showMore = this.state.shownEnv;
    showMore += modDisplay;
    this.setState({ shownEnv: showMore });
  };

  handleExpandLess = () => {
    var showLess = this.state.shownEnv;
    showLess -= modDisplay;
    this.setState({ shownEnv: showLess });
  };

  get title() {
    if (this.props.categorizedEnvironments) {
      const title = this.props.searchedTopic.name;
      return title;
    }
    return 'Recent environments';
  }
  render() {
    const { classes } = this.props;
    var environments = this.props.categorizedEnvironments
      ? this.props.categorizedEnvironments
      : this.props.environments;
    const empty = environments.length === 0;
    const all = true ? this.state.shownEnv >= environments.length : false;
    const none = true ? this.state.shownEnv <= modDisplay : false;
    environments = environments.slice(0, this.state.shownEnv);
    return (
      <div className={classes.root}>
        <Hero />
        <div className={classes.wrapper}>
          <TopicDrawer />
          <Grid container justify="center" className={classes.gridStyle}>
            <div>
              {!this.props.categorizedEnvironments && (
                <div>
                  <Typography variant="h4" className={classes.title}>
                    Features & Goals
                  </Typography>
                  <FeatureCards />
                </div>
              )}
              <Typography variant="h4" className={classes.title}>
                {this.title}
              </Typography>
              {empty && (
                <div className={classes.emptyStyle}>
                  <Typography variant="h6" className={classes.title}>
                    No environments found
                  </Typography>
                </div>
              )}
              {!empty && (
                <List>
                  {environments.map(env => (
                    <React.Fragment key={env.id}>
                      <EnvironmentItem key={env.id} environment={env} />
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              )}
              <ExpandMoreLess
                classes={classes}
                allEnvVisible={all}
                noEnvVisible={none}
                handleExpandMore={this.handleExpandMore}
                handleExpandLess={this.handleExpandLess}
              />
            </div>
          </Grid>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object),
  environments: PropTypes.arrayOf(PropTypes.object),
  categorizedEnvironments: PropTypes.arrayOf(PropTypes.object),
  searchedTopics: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  repositories: state.repositories.repositories,
  environments: state.environments.environments,
  categorizedEnvironments: state.environments.categorizedEnvironments,
  searchedTopic: state.environments.searchedTopic,
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Home);
