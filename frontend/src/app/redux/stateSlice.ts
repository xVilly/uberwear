import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';

import { ThunkAction } from 'redux-thunk';

import { RootState } from '../store/mainStore';

const stateSlice = createSlice({
  name: 'siteState',
  initialState: {
    loading: false,
    },
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});


export function setLoadingThunk(
  loading: boolean,
): ThunkAction<void, RootState, unknown, Action> {
  return async function loadingThunk(dispatch) {
    dispatch(setLoading(loading));
  };
}


export const { setLoading } = stateSlice.actions;
export default stateSlice.reducer;
