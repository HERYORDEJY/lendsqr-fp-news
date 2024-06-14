import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {LOGOUT} from '../actions';
import {
  AuthStoreInitialStateType,
  PartialAuthStoreInitialStateType,
} from './types';

const authStoreInitialState: AuthStoreInitialStateType = {
  // isViewedOnboarding: false,
  isViewedWalkthrough: false,
  isInSession: false,
  // session: null,
  userRole: null,
};

export const authStoreSlice = createSlice({
  name: 'authentication',
  initialState: authStoreInitialState,
  reducers: {
    // setIsViewedOnboarding: (
    //   state
    //   // action?: PayloadAction<boolean>
    // ) => {
    //   state.isViewedOnboarding = true;
    // },
    setIsViewedWalkthrough(state, action: PayloadAction<boolean>) {
      state.isViewedWalkthrough = true;
    },
    setState: (
      state,
      action?: PayloadAction<PartialAuthStoreInitialStateType>,
    ) => {
      Object.assign(state, {
        ...action?.payload,
      });
    },
    setSession: (state, action: PayloadAction<any>) => {
      // state.session = action.payload;
      state.isInSession = true;
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
    builder.addCase(
      LOGOUT,
      state =>
        Object.assign(state, {
          ...authStoreInitialState,
          isViewedWalkthrough: true,
        }),
      // resetReduxStoreState({ initialState: authStoreInitialState, state })
    );
  },

  // extraReducers:  {
  //   LOGOUT: (state, action) => {
  //     return Object.assign(state, {
  //       ...authStoreInitialState,
  //       isViewedOnboarding: true,
  //     });
  //   },
  //   builder.addCase(PURGE, (state) => {
  //     Object.assign(state, {
  //       ...authStoreInitialState,
  //       isViewedOnboarding: true,
  //     });
  //   });
  // },
});

export const {setIsViewedWalkthrough: setIsViewedWalkthroughAction} =
  authStoreSlice.actions;
export const authStoreReducer = authStoreSlice.reducer;
