import {
  ToastMessageContextType,
  ToastMessageType,
} from '~/contextAPI/toast-message/types';
import React, { useState } from 'react';

export const ToastMessageContext =
  React.createContext<ToastMessageContextType | null>(null);

const initialState: ToastMessageType = {
  type: 'hide',
  message: undefined,
  title: undefined,
  icon: undefined,
};
export default function ToastMessageContextProvider({ ...props }) {
  const [toastMessage, setToastMessage] =
    useState<ToastMessageType>(initialState);
  const showToast = (toast: ToastMessageType) => {
    setToastMessage(toast);
  };

  const hideToast = () => {
    setToastMessage(initialState);
  };
  return (
    <ToastMessageContext.Provider
      value={{ toastMessage, showToast, hideToast }}
    >
      {props.children}
    </ToastMessageContext.Provider>
  );
}
