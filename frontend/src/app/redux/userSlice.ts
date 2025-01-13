import { Action, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../store/mainStore';
import parseCookie from '../utils/parseCookie';

export interface UserData {
  type: string;
  name: string;
  lastname: string;
  email: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    accessToken: (typeof document !== 'undefined' ? localStorage.getItem('token') : ""),
    user: {
      type: (typeof document !== 'undefined' ? parseCookie('userType') : ""),
      name: (typeof document !== 'undefined' ? parseCookie('userFirstName') : ""),
      lastname: (typeof document !== 'undefined' ? parseCookie('userLastName') : ""),
      email: (typeof document !== 'undefined' ? parseCookie('userEmail') : ""),
    },
  },
  reducers: {
    setUserData(state, action: PayloadAction<UserData>) {
      state.user = action.payload;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    }
  },
});

export const { setUserData, setAccessToken } = userSlice.actions;
export default userSlice.reducer;


export function setUserDataThunk(
  data: UserData,
): ThunkAction<void, RootState, unknown, Action> {
  return async function setDataThunk(dispatch) {
    document.cookie = `userType=${data.type}; SameSite=Strict; Secure; path=/`;
    document.cookie = `userFirstName=${data.name}; SameSite=Strict; Secure; path=/`;
    document.cookie = `userLastName=${data.lastname}; SameSite=Strict; Secure; path=/`;
    document.cookie = `userEmail=${data.email}; SameSite=Strict; Secure; path=/`;
    dispatch(setUserData(data));
  };
}

export function setAccessTokenThunk(
  token: string,
): ThunkAction<void, RootState, unknown, Action> {
  return async function setTokenThunk(dispatch) {
    localStorage.setItem('token', token);
    dispatch(setAccessToken(token));
  };
}