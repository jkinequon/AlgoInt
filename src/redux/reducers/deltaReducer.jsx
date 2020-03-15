import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function deltaReducer(state = initialState, action) {
  switch (action.type) {
    case (types.SIGN_IN): {
      return Object.assign({}, state, { ...state, signedIn: true });
    }

    case (types.SIGN_OFF): {
      return Object.assign({}, state,  { ...state, signedIn: false });
    }

    default:
      return state;
  }
}

