import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Spinner
} from "@blueprintjs/core";
import Login from "../auth/Login";
import types from "../../utils/types";
import "./Header.css";
import { SciGymIcon } from "../files/icons";

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Star from '@material-ui/icons/Star';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  toolBarStyle: {
    backgroundColor: '#82B1FF',//'#8C9EFF'//'#00bcd4',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
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
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
});


export class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event) {
    event.preventDefault();
    this.setState({ searchValue: event.target.value });
  }

  render() {
    const { loading } = this.props;
    const { searchValue } = this.state;
    const { classes } = this.props
    return (
      <AppBar position="sticky" color="inherit">
        <Toolbar className={classes.toolBarStyle}>
          <IconButton href="/" color="inherit" style={{backgroundColor: 'transparent', textDecoration: 'none'}}>
            <SciGymIcon/>
            SciGym
          </IconButton>
          <IconButton href="/" color="inherit" >
            <Star/>
            Get Started
          </IconButton>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search environments…"
              onChange={this.handleSearchChange}
              value={searchValue}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
            </div>
        
          {loading ? <Spinner size={30} /> : <Login />}
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  loading: Boolean(
    state.display.loaders.find(l => l === types.LOGIN_USER_GITHUB_OAUTH)
  )
});

export default withRouter(
  compose(
    connect(mapStateToProps),
    withStyles(styles)
  )(Header)
);
