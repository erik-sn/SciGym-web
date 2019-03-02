import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import ContributorCard from './ContributorCard';
import constants from '../../utils/constants';

const styles = theme => ({
  root: {
    margin: 'auto',
    paddingLeft: '10%',
    paddingRight: '10%',
    backgroundColor: 'AliceBlue',
    paddingTop: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0%',
      paddingRight: '0%',
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '20%',
      paddingRight: '20%',
    },
  },
  title: {
    position: 'relative',
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 4,
  },
  contentPaper: {
    display: 'flexGrow',
    width: '100%',
    marginTop: '10px',
  },
  gridStyle: {
    overflow: 'auto',
    overflowX: 'scroll',
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  paragraph: {
    position: 'relative',
    margin: theme.spacing.unit * 2,
  },
});

function Impressum(props) {
  const { classes, contributors } = props;
  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Impressum
      </Typography>
      <Typography variant="h5" className={classes.title}>
        Authors
      </Typography>
      <Typography variant="subtitle1" className={classes.paragraph}>
        Hendrik Poulsen Nautrup <br />
        Ryan Sweke <br />
        Petru Tighineanu <br />
        Erik Niehaus <br />
      </Typography>
      <Typography variant="h5" className={classes.title}>
        Contact Us
      </Typography>
      <Typography variant="subtitle1" className={classes.paragraph}>
        If you have any questions or ideas, contact us at info@scigym.ai
      </Typography>
      <Typography variant="h5" className={classes.title}>
        Supporters
      </Typography>
      <Typography variant="subtitle1" className={classes.paragraph}>
        <a href="https://unitary.fund/">
          <img
            src="https://img.shields.io/badge/Supported%20By-UNITARY%20FUND-brightgreen.svg?style=for-the-badge"
            alt="unitaryFund"
          />
        </a>
      </Typography>
      <Typography variant="subtitle1" className={classes.paragraph}>
        <a href="https://www.fwf.ac.at/en/">
          <img src={`${constants.STATIC_URL}/icons/FWF-logo.png`} alt="FWF" />
        </a>
      </Typography>
      <Typography variant="h5" className={classes.title}>
        Contributors
      </Typography>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={16}
        className={classes.gridStyle}
      >
        {contributors.map(contributor => (
          <Grid item key={contributor.id}>
            <ContributorCard contributor={contributor} />
          </Grid>
        ))}
        ;
      </Grid>
      <Typography variant="subtitle1" className={classes.paragraph}>
        <b>Thanks to everyone who contributed!</b>
      </Typography>
      {/* <Typography variant="h5" className={classes.title}>
          Special Thanks
        </Typography>
        <Typography variant="subtitle1" className={classes.paragraph}>
          Lea Trenkwalder <br />
          Prof. Hans Briegel <br />
        </Typography> */}
    </div>
  );
}

Impressum.propTypes = {
  classes: PropTypes.object.isRequired,
  contributors: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  contributors: state.contributors.contributors,
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Impressum);
