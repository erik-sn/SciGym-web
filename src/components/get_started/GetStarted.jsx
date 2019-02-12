import React, { Component }  from "react";
import PropTypes from "prop-types";

import YouTube from "react-youtube";

import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Play from './Play';
import Contribute from './Contribute';

import { withStyles } from "@material-ui/core";

const styles = theme => ({
	root: {
		margin: "auto",
		paddingLeft: "10%",
		paddingRight: "10%",
		backgroundColor: "AliceBlue",
		paddingTop: theme.spacing.unit,
		[theme.breakpoints.down('sm')]: {
			paddingLeft: "0%",
			paddingRight: "0%",
		},
		[theme.breakpoints.up('lg')]: {
			paddingLeft: "20%",
			paddingRight: "20%",
		}
	},
	playerPaper: {
		display: "flex",
		width: "100%",
	},
	playerWrapper: {
		position: 'relative',
		width: '100%',
		paddingBottom: '56.25%', /* Player ratio: 16:9 */
		margin: theme.spacing.unit,
	},
	player: {
		position: "absolute",
		top: "0",
		left: "0",
	},
	title: {
		position: 'relative',
		margin: theme.spacing.unit*2,
		marginTop: theme.spacing.unit*6,
	},
	startPaper: {
		display: "flexGrow",
		width: "100%",
		marginTop: "10px",
	},
	appBarStyle: {
		backgroundColor: '#039be5',//'#2196f3',//'#448aff',
		zIndex: '0',
	  },
})

function TabContainer(props) {
	return (
	  <Typography component="div" style={{ padding: 8 * 3 }}>
		{props.children}
	  </Typography>
	);
  }
  
  TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
  };

class GetStarted extends Component {
	state = {
		value: 0,
	}
	_onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
	}
	handleChange = (event, value) => {
		this.setState({ value });
	};
	render() {
		const vidOpts = {
			height: '100%',
			width: '100%',
			playerVars: { // https://developers.google.com/youtube/player_parameters
				autoplay: 0
			}
		}
		const { classes } = this.props;
		const { value } = this.state;
		return(
			<div className={classes.root}>
				<Typography variant="h4" className={classes.title}>What is SciGym?</Typography>
				<Paper className={classes.playerPaper}>
					<div className={classes.playerWrapper}>
						<YouTube 
							className={classes.player}
							videoId="zB1bypSgINA"
							opts={vidOpts}
							onReady={this._onReady}
						/>
					</div>
				</Paper>
				<Paper className={classes.startPaper}>
					<AppBar position="relative" className={classes.appBarStyle}>
						<Tabs value={value} onChange={this.handleChange} centered>
							<Tab label="Play" />
							<Tab label="Contribute" />
						</Tabs>
					</AppBar>
					{value === 0 && <TabContainer><Play/></TabContainer>}
					{value === 1 && <TabContainer><Contribute/></TabContainer>}
				</Paper>
			</div>
		)
	}
}

GetStarted.propTypes = {
	classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(GetStarted);