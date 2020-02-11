import actionTyper from 'redux-actiontyper';

const {
  SAVE_COLOUR,
  REMOVE_COLOUR
} = actionTyper('COLOUR/')

export const saveColour = payload => ({
  type: SAVE_COLOUR,
  payload
});

export const removeColour = payload => ({
  type: REMOVE_COLOUR,
  payload
});

export const types = {
  SAVE_COLOUR,
  REMOVE_COLOUR
};