// src/store/rootReducer.ts
import {combineReducers} from '@reduxjs/toolkit';
import {authStoreReducer} from './auth/authSlice';
import {newsReducer} from './news/slice';
import {themeStoreReducer} from './theme/themeSlice';
// Import slices

export const rootReducer = combineReducers({
  news: newsReducer,
  theme: themeStoreReducer,
  authentication: authStoreReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
