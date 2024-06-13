// src/store/rootReducer.ts
import {combineReducers} from '@reduxjs/toolkit';
import {newsReducer} from './news/slice';
// Import slices

export const rootReducer = combineReducers({
  news: newsReducer,
  // Add other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
