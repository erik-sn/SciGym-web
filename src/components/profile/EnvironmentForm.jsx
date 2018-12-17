import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { compose } from 'redux';
import { connect } from "react-redux";
import { getEnvironments } from "../../actions/environments";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import api from '../../utils/api';

const styles = theme => ({
	root:{
		flex: '1'
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	}
})

class EnvironmentForm extends Component {
  constructor(props) {
		super(props);
		this.state = {
			id: this.props.envExists ? this.props.environment.id : this.props.repository.id,
			name: this.props.envExists ? this.props.environment.name : this.props.repository.name,
			description: this.props.envExists ? this.props.environment.description : this.props.repository.description,
			error: '',
		}
    this.getEnvironments = this.getEnvironments.bind(this);
  };


	getEnvironments() {
		this.props.getEnvironments();
	};

	handleClose = () => {
    this.props.onClose();
	};

	handleSubmit = (event) => {
		// event,preventDefault();
		if (this.props.envExists) {
			api.editEnvironment(this.state).then(this.handleSuccess).catch(this.handleFailure);
		} else {
			const { name, description, id} = this.state;
			api.createEnvironment(name, description, id).then(this.handleSuccess).catch(this.handleFailure);
		}
	}

	handleSuccess = () => {
		this.handleClose();
    	api.environments().then((json) => {
	  		this.props.getEnvironments(json.data);
		});
	}
	
	handleFailure = () => {
		this.setState({ error: 'Problems!' })
	}
	

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
	};
	
	render() {
		const { classes } = this.props
		const { repository } = this.props;
		const { error } = this.state
		return (
			<form className={classes.container}>
				<Dialog onClose={this.handleClose} open={this.props.open} fullWidth>
					<DialogTitle> 
					{this.props.envExists ? 'Edit Environment' : 'Create Environment'}
					</DialogTitle>
					<TextField
						id="filled-name"
						label="Name"
						className={classes.textField}
						value={this.state.name}
						onChange={this.handleChange('name')}
						margin="normal"
						variant="filled"
					/>
					<TextField
						id="filled-full-description"
						label="Description"
						style={{ margin: 8 }}
						value={Boolean(this.state.description) ? this.state.description : ''}
						onChange={this.handleChange('description')}
						multiline
						margin="normal"
						variant="filled"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						disabled
						id="filled-disabled-owner"
						label="Owner"
						className={classes.textField}
						defaultValue={repository.owner.username}
						margin="normal"
						variant="filled"
					/>
					<Button onClick={this.handleSubmit}>
						Submit
					</Button>
					{error ? <h1> Something went wrong: {error} </h1> : null}
				</Dialog>
			</form>
		);
	}
}

EnvironmentForm.propTypes = {
  getEnvironments: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	repository: PropTypes.object.isRequired,
	environment: PropTypes.object,
	open: PropTypes.bool.isRequired,
	envExists: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({});
const mapDispatchToProps = {
	getEnvironments
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps),
		withStyles(styles)
)(EnvironmentForm);