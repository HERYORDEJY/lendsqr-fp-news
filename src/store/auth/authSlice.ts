import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LOGOUT } from '../actions';
import { AuthStoreInitialStateType } from './types';

const authStoreInitialState: AuthStoreInitialStateType = {
  user: null,
  additionalUserInfo: undefined,
  bio: null,
  isLoggedIn: false,
};

export const authStoreSlice = createSlice({
  name: 'authentication',
  initialState: authStoreInitialState,
  reducers: {
    setState: (state, action: PayloadAction<AuthStoreInitialStateType>) => {
      console.log('action.payload', action.payload);
      return Object.assign(state, {
        ...action?.payload,
      });
    },

    setAuthUser: (
      state,
      action: PayloadAction<AuthStoreInitialStateType['user']>,
    ) => {
      state.user = action?.payload!;
    },

    setAuthBio: (
      state,
      action: PayloadAction<AuthStoreInitialStateType['bio']>,
    ) => {
      state.bio = action?.payload!;
    },

    logout: state => {
      Object.assign(state, {
        ...authStoreInitialState,
        isViewedOnboarding: true,
      });
    },
  },
  extraReducers: builder => {
    //@ts-ignore
    builder.addCase(LOGOUT, state =>
      Object.assign(state, {
        ...authStoreInitialState,
        isViewedWalkthrough: true,
      }),
    );
  },
});

export const {
  setState: setAuthStoreStateAction,
  setAuthUser: setAuthStoreUserAction,
  setAuthBio: setAuthStoreBioAction,
} = authStoreSlice.actions;
export const authStoreReducer = authStoreSlice.reducer;
