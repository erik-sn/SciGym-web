import React from "react";

import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { SciGymLogo, GithubIcon } from '../files/images';

const RepositoryItem = ({
  name,
  description,
  owner,
  htmlUrl,
  sshUrl,
  gitUrl,
  pypiName,
}) => {
  return(
  <ListItem>
    <Card style={{width: '100%'}}>
      <div style={{display: 'flex', flexFlow: 'row wrap'}}>
        <div style={{flex: '1 1 10px', margin: 'auto', top: '0', bottom: '0', textAlign: 'center'}}>
          {/* add pictures */}
          <SciGymLogo /> 
        </div>
        <div style={{flex: '1 1 400px'}}>
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

    </Card>
  </ListItem>
  )};

export default RepositoryItem;
