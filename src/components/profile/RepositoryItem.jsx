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

import { createEnvironment, getEnvironments } from "../../actions/environments";
import { withStyles, IconButton } from "@material-ui/core";
import { compose } from 'redux';


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
  // constructor(props) {
  //   super(props);
  //   this.createEnvironment = this.createEnvironment.bind(this);
  //   this.getEnvironments = this.getEnvironments.bind(this);
  // }

  // getEnvironments() {
  //   this.props.getEnvironments();
  // }

  // createEnvironment() {
  //   this.props.createEnvironment();
  // }

  render() {
    const {
      name,
      description,
      owner,
      htmlUrl,
      sshUrl,
      gitUrl,
      pypiName,
    } = this.props;
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
            <Fab size="medium" className={classes.buttonPosition} color="primary">
              <AddIcon />
            </Fab>
            
            </div>
          </div>
    
        </Card>
      </ListItem>
    );
  }
} 



RepositoryItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  owner: PropTypes.object.isRequired,
  htmlUrl: PropTypes.string.isRequired,
  sshUrl: PropTypes.string,
  gitUrl: PropTypes.string,
  pypiName: PropTypes.string,
  // createEnvironment: PropTypes.func.isRequired,
  // getEnvironments:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userExists: Boolean(state.user.accessToken)
});

const mapDispatchToProps = {
  // createEnvironment,
  // getEnvironments
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps),
    withStyles(styles)
)(RepositoryItem);
