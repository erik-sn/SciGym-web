import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { SciGymLogo, GithubIcon } from '../../files/images';
import EnvironmentForm from './EnvironmentForm';
import DeleteEnvironment from './DeleteEnvironment';
import { getEnvironments, deleteEnvironment } from '../../../actions/environments';
import RepositoryItemFormArea from './RepositoryItemFormArea';

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
      openDelete: false,
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
    this.props.deleteEnvironment(this.props.environment);
    this.setState({
      openDelete: false,
    });
  };

  render() {
    const { name, description, owner, htmlUrl } = this.props.repository;
    const { classes } = this.props;
    const keyId = Boolean(this.props.environment)
      ? this.props.environment.id
      : this.props.repository.id;
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
                <Typography variant="subtitle1" gutterBottom>
                  {description}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
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
              <RepositoryItemFormArea
                classes={classes}
                envExists={Boolean(this.props.environment)}
                handleClickDelete={this.handleClickDelete}
                handleClickOpen={this.handleClickOpen}
              />
            </div>
          </div>
          {Boolean(this.props.environment) && (
            <DeleteEnvironment
              handleCloseDelete={this.handleCloseDelete}
              openDelete={this.state.openDelete}
              environment={this.props.environment}
              handleDelete={this.handleDelete}
            />
          )}
          <EnvironmentForm
            repository={this.props.repository}
            onClose={this.handleClose}
            open={this.state.open}
            environment={this.props.environment}
            envExists={Boolean(this.props.environment)}
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
  deleteEnvironment: PropTypes.func.isRequired,
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
  deleteEnvironment,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(RepositoryItem);
