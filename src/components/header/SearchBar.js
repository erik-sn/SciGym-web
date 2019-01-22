import React, { Component } from "react";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { debounce } from '../../utils/debounce';
import { searchEnvironments, resetSearchedEnvironments } from "../../actions/environments";
import PropTypes from "prop-types";
import { compose } from 'redux';
import { connect } from "react-redux";


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
});

export class SearchBar extends Component {
	constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
		this.handleSearch = this.handleSearch.bind(this);
		this.delayedSearch = debounce(this.props.searchEnvironments.bind(this), 500)
  }

	handleSearch(event) {
		event.preventDefault();
		this.setState({ searchValue: event.target.value })
		this.delayedSearch(event.target.value) // TODO: do a reset (and async)
	}

	render() {
    const { searchValue } = this.state;
		const { classes } = this.props
		return (
			<div className={classes.search}>
				<div className={classes.searchIcon}>
					<SearchIcon />
				</div>
				<InputBase
					placeholder="Search environments…"
					onChange={this.handleSearch}
					value={searchValue}
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
				/>
			</div>
		)
	}
}

SearchBar.propTypes = {
	searchEnvironments: PropTypes.func.isRequired,
	resetSearchedEnvironments: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  searchEnvironments,
  resetSearchedEnvironments
};

export default compose(
  connect(
    null,
    mapDispatchToProps),
    withStyles(styles)
)(SearchBar);