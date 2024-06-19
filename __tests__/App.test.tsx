import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import CodePush from 'react-native-code-push';
import Toast from 'react-native-toast-message';
import App from '../App';

jest.mock('react-native-code-push', () => ({
  InstallMode: {
    IMMEDIATE: 0,
  },
  SyncStatus: {
    CHECKING_FOR_UPDATE: 'CHECKING_FOR_UPDATE',
    DOWNLOADING_PACKAGE: 'DOWNLOADING_PACKAGE',
    INSTALLING_UPDATE: 'INSTALLING_UPDATE',
    UP_TO_DATE: 'UP_TO_DATE',
    UPDATE_INSTALLED: 'UPDATE_INSTALLED',
  },
  sync: jest.fn((options, statusCallback, progressCallback) => {
    statusCallback('UPDATE_INSTALLED');
    progressCallback({ receivedBytes: 100, totalBytes: 100 });
  }),
}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn(),
  config: {},
}));

jest.mock('~/navigations', () => {
  return {
    __esModule: true,
    default: () => <></>,
  };
});

jest.mock('~/hooks/useToastMessage', () => ({
  toastMessageConfig: {},
  useToastMessage: () => ({
    error: jest.fn(),
  }),
}));

jest.mock('react-native-config', () => ({
  LendsqrFpNews_ANDROID_APPCENTER_CODEPUSH_DEPLOYMENT_STAGING_KEY:
    'ANDROID_STAGING_KEY',
  LendsqrFpNews_ANDROID_APPCENTER_CODEPUSH_DEPLOYMENT_PRODUCTION_KEY:
    'ANDROID_PRODUCTION_KEY',
  LendsqrFpNews_IOS_APPCENTER_CODEPUSH_DEPLOYMENT_STAGING_KEY:
    'IOS_STAGING_KEY',
  LendsqrFpNews_IOS_APPCENTER_CODEPUSH_DEPLOYMENT_PRODUCTION_KEY:
    'IOS_PRODUCTION_KEY',
}));

describe('App Component', () => {
  it('renders correctly', async () => {
    const { getByText } = render(<App />);

    await waitFor(() => {
      expect(getByText('Update installed.')).toBeTruthy();
    });
  });

  it('calls CodePush sync on mount', async () => {
    const codePushSyncMock = CodePush.sync as jest.Mock;
    render(<App />);

    expect(codePushSyncMock).toHaveBeenCalled();
  });

  it('shows toast messages correctly', async () => {
    const { getByText } = render(<App />);

    Toast.show({ text1: 'Test Toast Message' });

    await waitFor(() => {
      expect(getByText('Test Toast Message')).toBeTruthy();
    });
  });
});
