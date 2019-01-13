import React from "react";
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

export default withStyles(styles)(Hero);
