import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    width: 200,
  },
  media: {
    height: 200,
  },
};

function ContributorCard(props) {
  const { classes, contributor } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea href={contributor.htmlUrl} target="_blank" rel="noopener noreferrer">
        <CardMedia
          className={classes.media}
          image={contributor.avatarUrl}
          title={contributor.login}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {contributor.login}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ContributorCard.propTypes = {
  classes: PropTypes.object.isRequired,
  contributor: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContributorCard);
