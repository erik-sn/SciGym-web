import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

import { debounce } from '../../utils/debounce';
import { searchEnvironments, resetSearchedEnvironments } from '../../actions/environments';
import ExpandMoreLess from '../ExpandMoreLess';
import SearchBarEnvList from './SearchBarEnvList';

const modDisplay = 10;

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing.unit * 6,
    width: 'auto',
    [theme.breakpoints.down('xs')]: {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.primary.main, 0.25),
      },
      margin: theme.spacing.unit * 2,
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing.unit * 4,
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 9,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 4,
    },
  },
  menuStyle: {
    zIndex: 1,
    minWidth: '200px',
    maxHeight: '200px',
    overflow: 'auto',
  },
});

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      open: false,
      visibleEnvironmentCount: modDisplay,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.delayedSearch = debounce(this.props.searchEnvironments, 500);
    this.delayedReset = debounce(this.props.resetSearchedEnvironments, 500);
  }

  handleExpandMore = () => {
    this.setState({ visibleEnvironmentCount: this.state.visibleEnvironmentCount + modDisplay });
  };

  handleExpandLess = () => {
    this.setState({ visibleEnvironmentCount: this.state.visibleEnvironmentCount - modDisplay });
  };

  handleSearch(event) {
    // TODO: LOADING and FAILURE and X-out button
    event.preventDefault();
    this.setState({ searchValue: event.target.value, open: true });
    if (event.target.value.trim().length >= 3) {
      this.delayedSearch(event.target.value);
    } else {
      this.delayedReset();
    }
  }
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { searchValue, open } = this.state;
    const { classes } = this.props;
    const environments = this.props.searchedEnvironments
      ? this.props.searchedEnvironments
      : this.props.environments;
    const all = true ? this.state.visibleEnvironmentCount >= environments.length : false;
    const none = true ? this.state.visibleEnvironmentCount <= modDisplay : false;
    const visibleEnvironments = environments.slice(0, this.state.visibleEnvironmentCount);
    return (
      <div className={classes.search}>
        <ClickAwayListener onClickAway={this.handleClose}>
          <div>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search environments…"
              onChange={this.handleSearch}
              onClick={this.handleSearch}
              value={searchValue}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
            <Popper open={open} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper className={classes.menuStyle} elevation={20}>
                    <SearchBarEnvList
                      environments={visibleEnvironments}
                      handleClose={this.handleClose}
                    />
                    <ExpandMoreLess
                      classes={classes}
                      allEnvVisible={all}
                      noEnvVisible={none}
                      handleExpandMore={this.handleExpandMore}
                      handleExpandLess={this.handleExpandLess}
                    />
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </ClickAwayListener>
      </div>
    );
  }
}

SearchBar.propTypes = {
  searchEnvironments: PropTypes.func.isRequired,
  resetSearchedEnvironments: PropTypes.func.isRequired,
  environments: PropTypes.arrayOf(PropTypes.object),
  environsearchedEnvironmentsments: PropTypes.arrayOf(PropTypes.object),
};

const mapDispatchToProps = {
  searchEnvironments,
  resetSearchedEnvironments,
};

const mapStateToProps = state => ({
  environments: state.environments.environments,
  searchedEnvironments: state.environments.searchedEnvironments,
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(SearchBar);
