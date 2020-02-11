import React from 'react';

import './ColourBox.scss';

const ColourBox = ({ hexCode }) => (
  <div className="o-colour-box" style={{ backgroundColor: hexCode}} />
);

export default ColourBox;
