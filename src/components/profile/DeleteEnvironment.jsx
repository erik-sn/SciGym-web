import React, { Component } from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';

class DeleteEnvironment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.environment.name,
		}
	}

	render() {
		return (
			<Dialog 
				open={this.props.openDelete}
				onClose={this.props.handleCloseDelete}
			>
			<DialogTitle>
				Are you sure you want to delete the environment "{this.state.name}"?
				{this.props.error ? <Typography color='error'>{this.props.error}</Typography> : null}
			</DialogTitle>
			<DialogActions>
			<Button onClick={this.props.handleDelete} color="secondary">
        Delete
      </Button>
			<Button onClick={this.props.handleCloseDelete} color="primary">
        Cancel
      </Button>
			</DialogActions>
			</Dialog>
		)
	}
}


DeleteEnvironment.propTypes = {
	handleCloseDelete: PropTypes.func.isRequired,
	environment: PropTypes.object,
	openDelete: PropTypes.bool.isRequired,
	handleDelete: PropTypes.func.isRequired,
	error: PropTypes.string.isRequired
};


export default DeleteEnvironment;