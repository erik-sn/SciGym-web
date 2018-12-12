import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { compose } from 'redux';
import { connect } from "react-redux";
import { createEnvironment } from "../../actions/environments";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

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
	},
})

class EnvironmentForm extends Component {
  constructor(props) {
		super(props);
		this.state = {
			id: this.props.envExists ? this.props.environment.id : this.props.repo.id,
			name: this.props.envExists ? this.props.environment.name : this.props.repo.name,
			description: this.props.envExists ? this.props.environment.description : this.props.repo.description,
		}
    this.createEnvironment = this.createEnvironment.bind(this);
  };


  createEnvironment() {
    this.props.createEnvironment();
	};

	handleClose = () => {
    this.props.onClose();
	};


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
	};
	
	render() {
		const { classes } = this.props
		const { environment } = this.props;
		const { repo } = this.props;
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
						defaultValue={repo.owner.username}
						margin="normal"
						variant="filled"
					/>
				</Dialog>
			</form>
		);
	}
}

EnvironmentForm.propTypes = {
  createEnvironment: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	repo: PropTypes.object.isRequired,
	open: PropTypes.bool.isRequired,
	envExists: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({});
const mapDispatchToProps = {
	createEnvironment
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps),
		withStyles(styles)
)(EnvironmentForm);