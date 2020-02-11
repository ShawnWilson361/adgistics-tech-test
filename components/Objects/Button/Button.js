import React from 'react';

import classnames from 'classnames';

import mapModifiersToClasses from '../../../utils/Mappers/mapModifiersToClasses'

import './Button.scss';

const Button = ({ children, id, className, modifiers, onClick }) => {
  const classes = mapModifiersToClasses('o-button', modifiers);

  return (
    <button 
      id={id}
      className={classnames(classes, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;