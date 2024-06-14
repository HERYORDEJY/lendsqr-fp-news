import React from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'hide';

export interface ToastMessageType {
  type: ToastType;
  title?: string;
  message?: string;
  icon?: React.ReactElement;
}
export type ToastMessageContextType = {
  toastMessage: ToastMessageType;
  showToast: (toast: ToastMessageType) => void;
  hideToast: () => void;
};
