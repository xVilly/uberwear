import { Action, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../store/mainStore';
import parseCookie from '../utils/parseCookie';
import { StringLiteral } from 'typescript';

export interface UserData {
  access: string;
  type: string;
  name: string;
  lastname: string;
  email: string;
  clid : string;
  loyalty_points: string;
  coid: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    accessToken: (typeof document !== 'undefined' ? localStorage.getItem('accessToken') : ""),
    clientID: (typeof document !== 'undefined' ? parseCookie('client_id') : ""),
    loyaltyPoints: (typeof document !== 'undefined' ? parseCookie('loyalty_points') : ""),
    courierID: (typeof document !== 'undefined' ? parseCookie('courier_id') : ""),
    user: {
      access: (typeof document !== 'undefined' ? parseCookie('accessToken') : ""),
      type: (typeof document !== 'undefined' ? parseCookie('userType') : ""),
      name: (typeof document !== 'undefined' ? parseCookie('userFirstName') : ""),
      lastname: (typeof document !== 'undefined' ? parseCookie('userLastName') : ""),
      email: (typeof document !== 'undefined' ? parseCookie('userEmail') : ""),
      clid: (typeof document !== 'undefined' ? parseCookie('client_id') : ""),
      loyalty_points: (typeof document !== 'undefined' ? parseCookie('loyalty_points') : ""),
      coid: (typeof document !== 'undefined' ? parseCookie('courier_id') : ""),

     
    },
  },
  reducers: {
    setUserData(state, action: PayloadAction<UserData>) {
      state.user = action.payload;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setClientID(state, action: PayloadAction<string>) {
      state.clientID = action.payload;
    },
    setLoyaltyPoints(state, action: PayloadAction<string>) {
      state.loyaltyPoints = action.payload;
    },
    setCourierID(state, action: PayloadAction<string>) {
      state.courierID = action.payload;
    }
  },
});

export const { setUserData, setAccessToken, setClientID,setLoyaltyPoints,setCourierID } = userSlice.actions;

export default userSlice.reducer;


export function setUserDataThunk(
  data: UserData,
): ThunkAction<void, RootState, unknown, Action> {
  return async function setDataThunk(dispatch) {
    document.cookie = `accessToken=${data.access}; SameSite=Strict; Secure; path=/`;
    document.cookie = `userType=${data.type}; SameSite=Strict; Secure; path=/`;
    document.cookie = `userFirstName=${data.name}; SameSite=Strict; Secure; path=/`;
    document.cookie = `userLastName=${data.lastname}; SameSite=Strict; Secure; path=/`;
    document.cookie = `userEmail=${data.email}; SameSite=Strict; Secure; path=/`;
    document.cookie = `client_id=${data.clid}; SameSite=Strict; Secure; path=/`;
    document.cookie = `loyalty_points=${data.loyalty_points}; SameSite=Strict; Secure; path=/`;
    document.cookie = `courier_id=${data.coid}; SameSite=Strict; Secure; path=/`;
    dispatch(setUserData(data));
  };
}

export function setAccessTokenThunk(
  token: string,
): ThunkAction<void, RootState, unknown, Action> {
  return async function setTokenThunk(dispatch) {
    localStorage.setItem('accessToken', token);
    dispatch(setAccessToken(token));
  };
}

export function setClientIDThunk(
  id: string,
): ThunkAction<void, RootState, unknown, Action> {
  return async function setIDThunk(dispatch) {
    localStorage.setItem('clientID', id);
    dispatch(setClientID(id));
  };
}
export function setLoyaltyPointsThunk(
  points: string,
): ThunkAction<void, RootState, unknown, Action> {
  return async function setPointsThunk(dispatch) {
    localStorage.setItem('loyaltyPoints', points);
    dispatch(setLoyaltyPoints(points));
  };
}
export function setCourierIDThunk(
  id: string,
): ThunkAction<void, RootState, unknown, Action> {
  return async function setIDThunk(dispatch) {
    localStorage.setItem('courierID', id);
    dispatch(setCourierID(id));
  };
}