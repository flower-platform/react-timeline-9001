import React from 'react';
import PropTypes from 'prop-types';

const Marker = props => {
  const {height, left, top, className} = props;
  const cssClass = "rct9k-marker-overlay " + className;
  return <div className={cssClass} style={{height, left, top}} />;
};

Marker.propTypes = {
  height: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired
};

export default Marker;
