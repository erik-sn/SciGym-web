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
import LocalOffer from "@material-ui/icons/LocalOffer";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';

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
  tagStyle: {
		margin: theme.spacing.unit,
	},
  buttonPosition: {
    position: 'absolute',
    right: '40px',
    bottom: '25px',
  },
  readmeStyle: {
    margin: theme.spacing.unit,
  },
  chipPosition: {
    position: 'absolute',
    right: '40px',
    bottom: '25px',
  }
})
class EnvironmentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: '',
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

  render() {
    const {
      owner,
      htmlUrl,
      readme,
      gym,
    } = this.props.environment.repository;
    const {
      name,
      description,
      tags,
    } = this.props.environment
    const { classes } = this.props;
    var converter = new showdown.Converter();
    converter.setFlavor('github');
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
                    <List>
                      {tags.map(tag => (
                        <Chip
                        icon={<LocalOffer/>}
                        label={tag}
                        key={tag}
                        clickable
                        className={classes.tagStyle}
                        color="primary"
                        variant="outlined"
                      />
                      ))}
                    </List>
                    {/* <Typography variant="subheading">{pypiName && <pre>pip install {pypiName}</pre>}</Typography> */}
                  </CardContent>
                  <CardActions>
                    <Button href={htmlUrl}>
                      <GithubIcon />
                      Github
                    </Button>
                  </CardActions>
                  {gym ? 
                  <div className={classes.chipPosition}> 
                  <Chip
                    icon={<Done/>}
                    label="Verified Gym Environment"
                    className={classes.tagStyle}
                    color="primary"
                  /> 
                  </div> :
                  <div className={classes.chipPosition}> 
                  <Chip
                  icon={<ErrorOutline/>}
                  label="Not a Gym Environment"
                  className={classes.tagStyle}
                  color="secondary"
                  />
                  </div>
                  }  
                </div>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{maxWidth: '100%', alignItems: 'center'}}>
            <Paper style={{maxHeight: '500px', overflowY: 'scroll', overflowX: 'hidden'}}>
              <div 
                // if html
                // dangerouslySetInnerHTML={{ __html: this.props.environment.repository.readme }} 
                // if raw
                // dangerouslySetInnerHTML={{ __html: converter.makeHtml(this.props.environment.repository.readme)}}
                // if md
                dangerouslySetInnerHTML={{ __html: converter.makeHtml(atob(readme))}}
                className={classes.readmeStyle}
                />
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
