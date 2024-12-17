import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../redux/userSlice';
import stateReducer from '../redux/stateSlice';

export function createReducer() {
  return combineReducers({
    user: userReducer,
    siteState: stateReducer,
  });
}
