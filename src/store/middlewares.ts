// src/middleware/loggingMiddleware.ts
import {Middleware} from '@reduxjs/toolkit';
import {firebase} from '@react-native-firebase/analytics';

export const loggingMiddleware: Middleware = store => next => action => {
  firebase.analytics().logEvent('action', {
    action_type: action.type,
    action_payload: action.payload,
  });
  return next(action);
};

export default loggingMiddleware;
