import { createSlice } from '@reduxjs/toolkit';
import { appThemeColors } from '~/styles/colors';
import { ThemeStoreInitialStateType } from './types';

const initialThemeState: ThemeStoreInitialStateType = {
  mode: 'LIGHT',
  colors: appThemeColors['LIGHT'],
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    switchThemeMode: state => {
      const newMode = state.mode === 'LIGHT' ? 'DARK' : 'LIGHT';
      state.mode = newMode;
      state.colors = appThemeColors[newMode];
    },
  },
  extraReducers: builder => {
    //@ts-ignore
    // builder.addCase(
    //   LOGOUT,
    //   state =>
    //     Object.assign(state, {
    //       ...initialThemeState,
    //       mode: 'LIGHT',
    //     }),
    // );
  },
});

export const themeStoreReducer = themeSlice.reducer;
export const { switchThemeMode: switchThemeModeAction } = themeSlice.actions;
