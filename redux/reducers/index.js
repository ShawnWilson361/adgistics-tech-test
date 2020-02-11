
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {reducer as toastrReducer} from 'react-redux-toastr';

import colours from './colours';

const rootReducer = {
  colours,
  toastr:  toastrReducer
};

export default rootReducer;
