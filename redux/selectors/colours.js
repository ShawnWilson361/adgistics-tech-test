import { createSelector } from 'reselect';

import { get } from 'lodash';

export const getSavedColours = state => get(state, 'colours.colours');