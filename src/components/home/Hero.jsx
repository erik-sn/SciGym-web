import React from "react";
import propTypes from "prop-types";
import { withStyles } from "@material-ui/core";

const styles = {
  hero: {
    height: '400px',
    width: '100%',
    backgroundPosition: '50% 50%',
    backgroundSize: 'cover',
  }
};

const Hero = props => {
  const { classes } = props
  return (
    <div
      className={classes.hero}
      style={{
        backgroundImage:
          "url(http://localhost:8000/static/images/ai_photonics_banner.jpg"
      }}
    />
  );
};

Hero.propTypes = {};

export default withStyles(styles)(Hero);
