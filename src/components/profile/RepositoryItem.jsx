import React, { Component }  from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

import { SciGymLogo, GithubIcon } from '../files/images';
import AddIcon from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';

import { withStyles } from "@material-ui/core";
import { compose } from 'redux';
import EnvironmentForm from "./EnvironmentForm";


const styles = {
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
  buttonPosition: {
    position: 'absolute',
    right: '40px',
    bottom: '30px',
  }
}

class RepositoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      envExists: Boolean(this.props.environment)
    };
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  }

  handleClose = () => {
    this.setState({ open: false });
}


  render() {
    const {
      name,
      description,
      owner,
      htmlUrl,
      sshUrl,
      gitUrl,
      pypiName,
    } = this.props.repo;
    const { classes } = this.props;
    return(
      <ListItem>
        <Card className={classes.cardStyle}>
          <div className={classes.root}>
            <div className={classes.logoStyle}>
              {/* add pictures */}
              <SciGymLogo /> 
            </div>
            <div className={classes.cardContentStyle}>
              <CardContent>
                <Typography variant="h5" component='h2' gutterBottom>
                  {name}
                </Typography>
                <Typography variant='subheading' gutterBottom>
                  {description}
                </Typography>
                <Typography variant='subheading' gutterBottom>
                  Owner: <a href={"https://github.com/".concat(owner.username)}> {owner.username} </a>
                </Typography>
                <Typography variant="subheading">{pypiName && <pre>pip install {pypiName}</pre>}</Typography>
              </CardContent>
              <CardActions>
                <Button href={htmlUrl}>
                  <GithubIcon />
                  Github
                </Button>
              </CardActions>
              {this.state.envExists ? 
              <Fab size="medium" className={classes.buttonPosition} color="primary" onClick={this.handleClickOpen}>
                <Edit />
              </Fab> : 
              <Fab size="medium" className={classes.buttonPosition} color="primary" onClick={this.handleClickOpen}>
                <AddIcon />
              </Fab>
            }
    
            </div>
          </div>
          <EnvironmentForm 
            repo={this.props.repo}
            onClose={this.handleClose}
            open={this.state.open}
            environment={this.props.environment}
            envExists={this.state.envExists}
          />
        </Card>
      </ListItem>
    );
  }
} 



RepositoryItem.propTypes = {
  key: PropTypes.string,
  repo: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  const repoId = ownProps.repo.id;
  const { environments } = state.environments;
  return {
    environment: environments.find(env => env.id === repoId) // check env.repo instead of id
  };
}

const mapDispatchToProps = {
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps),
    withStyles(styles)
)(RepositoryItem);
