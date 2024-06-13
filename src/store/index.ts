// src/store/index.ts
import {configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import loggingMiddleware from './middlewares';
import {mmkvReduxStorage} from './mmkv-storage';
import rootReducer from './root-reducer';

const persistConfig = {
  key: 'lendsqrfpnews',
  storage: mmkvReduxStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(loggingMiddleware),
});

export const persistor = persistStore(store);
export default store;
