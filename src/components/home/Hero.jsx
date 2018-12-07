import React from "react";
import PropTypes from "prop-types";

import "./Hero.css";

const Hero = props => {
  return (
    <div
      className="hero"
      style={{
        backgroundImage:
          "url(https://cdn-images-1.medium.com/max/2000/1*m2gDBT_nc-iE7R4AM3sHBQ.jpeg)"
      }}
    />
  );
};

Hero.propTypes = {};

export default Hero;
