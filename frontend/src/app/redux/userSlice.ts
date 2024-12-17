import { Action, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../store/mainStore';
import parseCookie from '../utils/parseCookie';

export interface UserData {
  session: string;
  name: string;
  access: number;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    group: (typeof document !== 'undefined' ? parseCookie('group') : ""),
    user: {
      session: (typeof document !== 'undefined' ? parseCookie('gateSession') : ""),
      name: (typeof document !== 'undefined' ? parseCookie('gateUserName') : ""),
      access: (typeof document !== 'undefined' ? parseInt(parseCookie('gateAccess')) : 0)
    },
    accessToken: (typeof document !== 'undefined' ? localStorage.getItem('access-token') : "")
  },
  reducers: {
    setUserGroup(state, action: PayloadAction<string>) {
      state.group = action.payload;
    },
    setUserData(state, action: PayloadAction<UserData>) {
      state.user = action.payload;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    }
  },
});

export const { setUserGroup, setUserData, setAccessToken } = userSlice.actions;
export default userSlice.reducer;


export function setUserDataThunk(
  data: UserData,
): ThunkAction<void, RootState, unknown, Action> {
  return async function setDataThunk(dispatch) {
    document.cookie = `gateSession=${data.session}; SameSite=Strict; Secure; path=/`;
    document.cookie = `gateUserName=${data.name}; SameSite=Strict; Secure; path=/`;
    document.cookie = `gateAccess=${data.access}; SameSite=Strict; Secure; path=/`;
    dispatch(setUserData(data));
  };
}

export function setUserGroupThunk(
  role: string,
): ThunkAction<void, RootState, unknown, Action> {
  return async function switchRoleThunk(dispatch) {
    document.cookie = `group=${role}; SameSite=Strict; Secure; path=/`;
    dispatch(setUserGroup(role));
  };
}

export function setAccessTokenThunk(
  token: string,
): ThunkAction<void, RootState, unknown, Action> {
  return async function setTokenThunk(dispatch) {
    localStorage.setItem('access-token', token);
    dispatch(setAccessToken(token));
  };
}