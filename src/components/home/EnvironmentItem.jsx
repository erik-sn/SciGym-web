import React, { Component }  from "react";
import PropTypes from "prop-types";

import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { SciGymLogo, GithubIcon } from '../files/images';

import { withStyles } from "@material-ui/core";

import showdown from "showdown";



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
  readmeStyle: {
    margin: theme.spacing.unit,
  }
})
class EnvironmentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: '',
      readme_html: '',
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
	
	handleFailure = () => {
		this.setState({ error: 'Problems!' })
  }
  
  componentDidMount() {
    var converter = new showdown.Converter();
    this.setState({ readme_html: converter.makeHtml(atob(this.props.environment.repository.readme)) })
  }


  render() {
    const {
      owner,
      htmlUrl,
      sshUrl,
      gitUrl,
      pypiName,
      readme,
    } = this.props.environment.repository;
    const {
      name,
      description,
    } = this.props.environment
    const { classes } = this.props;
    
    // var parser = new DOMParser()
    return(
      <ListItem>
        <Card className={classes.cardStyle}>
          <ExpansionPanel>
            <ExpansionPanelSummary>
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
                </div>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Paper style={{maxHeight: '500px', overflow: 'auto', maxWidth: '100%'}}>
              <div dangerouslySetInnerHTML={{ __html: this.state.readme_html }} className={classes.readmeStyle}/>
            </Paper>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Card>
          

      </ListItem>
    );
  }
} 



EnvironmentItem.propTypes = {
  key: PropTypes.string,
  environment: PropTypes.object.isRequired
};

export default withStyles(styles)(EnvironmentItem);
