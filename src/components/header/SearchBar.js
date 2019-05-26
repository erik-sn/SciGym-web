import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { debounce } from '../../utils/debounce';
import { searchEnvironments, resetSearchedEnvironments } from '../../actions/environments';

const modDisplay = 10;

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    visibility: 'hidden',
    [theme.breakpoints.up('sm')]: {
      visibility: 'visible',
      marginLeft: theme.spacing.unit * 6,
      width: 'auto',
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
  },
  menuStyle: {
    minWidth: '200px',
    maxHeight: '200px',
    overflow: 'auto',
  },
});

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      open: false,
      shownEnv: modDisplay,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.delayedSearch = debounce(this.props.searchEnvironments, 500);
    this.delayedReset = debounce(this.props.resetSearchedEnvironments, 500);
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
    var environments = this.props.searchedEnvironments
      ? this.props.searchedEnvironments
      : this.props.environments;
    const all = true ? this.state.shownEnv >= environments.length : false;
    const none = true ? this.state.shownEnv <= modDisplay : false;
    environments = environments.slice(0, this.state.shownEnv);
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
                  <Paper className={classes.menuStyle}>
                    <MenuList
                      subheader={
                        <ListSubheader disableSticky component="div">
                          Environment names
                        </ListSubheader>
                      }
                    >
                      <Divider />
                      {environments.length === 0 && (
                        <MenuItem disabled key="0">
                          No environment found
                        </MenuItem>
                      )}
                      {environments.length > 0 &&
                        environments.map(env => (
                          <MenuItem
                            key={env.id}
                            value={env.name}
                            component={Link}
                            to={'/env/' + env.name}
                            onClick={this.handleClose}
                          >
                            {env.name}
                          </MenuItem>
                        ))}
                    </MenuList>
                    <div>
                      {all ? (
                        <IconButton disabled variant="contained" onClick={this.handleExpandMore}>
                          <ExpandMoreIcon />
                        </IconButton>
                      ) : (
                        <IconButton variant="contained" onClick={this.handleExpandMore}>
                          <ExpandMoreIcon />
                        </IconButton>
                      )}
                      {none ? (
                        <IconButton disabled variant="contained" onClick={this.handleExpandLess}>
                          <ExpandLessIcon />
                        </IconButton>
                      ) : (
                        <IconButton variant="contained" onClick={this.handleExpandLess}>
                          <ExpandLessIcon />
                        </IconButton>
                      )}
                    </div>
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
