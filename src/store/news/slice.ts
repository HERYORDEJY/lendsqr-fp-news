// src/store/slices/newsSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NewsState} from './types';

const initialState: NewsState = {
  articles: [],
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews(state, action: PayloadAction<any[]>) {
      state.articles = action.payload;
    },
  },
});

export const {setNews: setNewsAction} = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
