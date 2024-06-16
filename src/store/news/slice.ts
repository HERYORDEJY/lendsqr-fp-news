// src/store/slices/newsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOGOUT } from '../actions';
import { NewsArticleDataType, NewsState } from './types';

const initialNewsState: NewsState = {
  everything: null,
  topHeadlines: null,
  bookmarkedNews: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState: initialNewsState,
  reducers: {
    setEverythingNews(
      state,
      action: PayloadAction<Array<NewsArticleDataType>>,
    ) {
      state.everything = action.payload;
    },
    setTopHeadlineNews(
      state,
      action: PayloadAction<Array<NewsArticleDataType>>,
    ) {
      state.topHeadlines = action.payload;
    },
    setBookmarkedNews(state, action: PayloadAction<{ urls: Array<string> }>) {
      state.bookmarkedNews = action.payload;
    },
    addBookmark(state, action: PayloadAction<string>) {
      let urls = state.bookmarkedNews?.urls ?? [];
      urls.push(action.payload);
      state.bookmarkedNews = { urls };
    },
    removeBookmark(state, action: PayloadAction<string>) {
      const urls = state.bookmarkedNews?.urls?.filter(
        url => url !== action.payload,
      )!;
      state.bookmarkedNews = { ...(state.bookmarkedNews ?? {}), urls };
    },
  },
  extraReducers: builder => {
    //@ts-ignore
    builder.addCase(LOGOUT, state =>
      Object.assign(state, {
        ...initialNewsState,
      }),
    );
  },
});

export const {
  setEverythingNews: setEverythingNewsAction,
  setTopHeadlineNews: setTopHeadlineNewsAction,
  addBookmark: addBookmarkAction,
  setBookmarkedNews: setBookmarkedNewsAction,
  removeBookmark: removeBookmarkAction,
} = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
