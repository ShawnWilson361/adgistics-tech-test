import { filter, forEach, isEmpty } from 'lodash';
import classnames from 'classnames';

const mapModifiersToClasses = (name, modifiers) => {
  if (isEmpty(modifiers || [])) {
    return name;
  }

  const mappedModifiers = [];

  mappedModifiers.push(name);

  forEach(filter(modifiers, m => !!m) || [], modifier =>
    mappedModifiers.push(` ${name}--${modifier}`)
  );

  return classnames(mappedModifiers);
};

export default mapModifiersToClasses;
