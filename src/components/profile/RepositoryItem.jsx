import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import AddIcon from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

import { SciGymLogo, GithubIcon } from '../files/images';
import EnvironmentForm from './EnvironmentForm';
import DeleteEnvironment from './DeleteEnvironment';
import api from '../../utils/api';
import { getEnvironments } from '../../actions/environments';

const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  cardStyle: {
    width: '100%',
  },
  logoStyle: {
    flex: '1 1 10px',
    margin: 'auto',
    top: '0',
    bottom: '0',
    textAlign: 'center',
  },
  cardContentStyle: {
    flex: '1 1 400px',
  },
  buttonStyle: {
    margin: theme.spacing.unit,
  },
  buttonPosition: {
    position: 'absolute',
    right: '40px',
    bottom: '25px',
  },
});

class RepositoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      envExists: Boolean(props.environment),
      openDelete: false,
      error: '',
    };
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickDelete = () => {
    this.setState({ openDelete: true });
  };

  handleCloseDelete = () => {
    this.setState({ openDelete: false });
  };

  handleDelete = () => {
    api
      .deleteEnvironment(this.props.environment) //this should not be an API call but an action
      .then(this.handleSuccess)
      .catch(this.handleFailure);
  };

  handleSuccess = () => {
    api.environments().then(json => {
      this.props.getEnvironments(json.data);
      this.setState({
        envExists: !this.state.envExists,
        openDelete: false,
        error: '',
      });
    });
  };

  handleFailure = () => {
    this.setState({ error: "Can't be deleted!" });
  };

  componentDidUpdate(prevProps) {
    if (this.props.environment !== prevProps.environment) {
      this.setState({ envExists: Boolean(this.props.environment) });
    }
  }

  render() {
    const { name, description, owner, htmlUrl } = this.props.repository;
    const { classes } = this.props;
    const keyId = this.state.envExists ? this.props.environment.id : this.props.repository.id;
    return (
      <ListItem>
        <Card className={classes.cardStyle} raised>
          <div className={classes.root}>
            <div className={classes.logoStyle}>
              <SciGymLogo />
            </div>
            <div className={classes.cardContentStyle}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {name}
                </Typography>
                <Typography variant="subheading" gutterBottom>
                  {description}
                </Typography>
                <Typography variant="subheading" gutterBottom>
                  Owner:{' '}
                  <a href={'https://github.com/'.concat(owner.username)}> {owner.username} </a>
                </Typography>
              </CardContent>
              <CardActions>
                <Button href={htmlUrl}>
                  <GithubIcon />
                  Github
                </Button>
              </CardActions>
              {this.state.envExists ? (
                <div className={classes.buttonPosition}>
                  <Fab
                    size="small"
                    color="secondary"
                    onClick={this.handleClickDelete}
                    className={classes.buttonStyle}
                  >
                    <Delete />
                  </Fab>
                  <Fab
                    size="small"
                    color="primary"
                    onClick={this.handleClickOpen}
                    className={classes.buttonStyle}
                  >
                    <Edit />
                  </Fab>
                  <DeleteEnvironment
                    handleCloseDelete={this.handleCloseDelete}
                    openDelete={this.state.openDelete}
                    environment={this.props.environment}
                    handleDelete={this.handleDelete}
                    error={this.state.error}
                    key={keyId}
                  />
                </div>
              ) : (
                <Fab
                  size="medium"
                  className={classes.buttonPosition}
                  color="primary"
                  onClick={this.handleClickOpen}
                >
                  <AddIcon />
                </Fab>
              )}
            </div>
          </div>
          <EnvironmentForm
            repository={this.props.repository}
            onClose={this.handleClose}
            open={this.state.open}
            environment={this.props.environment}
            envExists={this.state.envExists}
            key={keyId}
          />
        </Card>
      </ListItem>
    );
  }
}

RepositoryItem.propTypes = {
  key: PropTypes.string,
  repository: PropTypes.object.isRequired,
  getEnvironments: PropTypes.func.isRequired,
  environment: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  const repoId = ownProps.repository.id;
  const { environments } = state.environments; // this is empty at reload
  return {
    environment: environments.find(env => env.repository.id === repoId), // check env.repo instead of id
  };
}

const mapDispatchToProps = {
  getEnvironments,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(RepositoryItem);
