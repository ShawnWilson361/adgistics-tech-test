import { filter, get, union, uniqBy } from 'lodash';

import { types as colourActionTypes } from '../actions/colourActions';

const initialState = {
  colours: []
};

export default (state = initialState, action) => {
  switch (get(action, 'type')) {
    case colourActionTypes.SAVE_COLOUR:
      return Object.assign({}, state, {
        colours: uniqBy(
          union(get(state, 'colours'),[get(action, 'payload')]), 
          x => get(x, 'hexCode')
        )
      });
    case colourActionTypes.REMOVE_COLOUR:
      return Object.assign({}, state, {
        colours: filter(get(state, 'colours'), x => get(x, 'hexCode') !== get(action, 'payload'))
      });
    default:
      return state;
  }
};
