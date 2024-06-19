/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CodePush from 'react-native-code-push';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import CustomErrorBoundary from '~/components/general/CustomErrorBoundary';
import { toastMessageConfig } from '~/hooks/useToastMessage';
import RootNavigation from '~/navigations';
import store, { persistor } from '~/store';

const queryClient = new QueryClient();

const appcenterCodepushDeploymentKey = () => {
  switch (true) {
    case __DEV__ && Platform.OS === 'android':
      return Config.LendsqrFpNews_ANDROID_APPCENTER_CODEPUSH_DEPLOYMENT_STAGING_KEY;

    case !__DEV__ && Platform.OS === 'android':
      return Config.LendsqrFpNews_ANDROID_APPCENTER_CODEPUSH_DEPLOYMENT_PRODUCTION_KEY;

    case __DEV__ && Platform.OS === 'ios':
      return Config.LendsqrFpNews_IOS_APPCENTER_CODEPUSH_DEPLOYMENT_STAGING_KEY;

    case !__DEV__ && Platform.OS === 'ios':
      return Config.LendsqrFpNews_IOS_APPCENTER_CODEPUSH_DEPLOYMENT_PRODUCTION_KEY;

    default:
      return undefined;
  }
};

function App(): React.JSX.Element {
  const [updateInfo, setUpdateInfo] = useState(null);

  useEffect(() => {
    CodePush.sync(
      {
        deploymentKey: appcenterCodepushDeploymentKey(),
        updateDialog: true,
        installMode: CodePush.InstallMode.IMMEDIATE,
        //  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
      },
      status => {
        switch (status) {
          case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
            console.log('Checking for updates.');
            break;
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            console.log('Downloading package.');
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            console.log('Installing update.');
            break;
          case CodePush.SyncStatus.UP_TO_DATE:
            console.log('Up-to-date.');
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            console.log('Update installed.');
            break;
        }
      },
      progress => {
        console.log(
          `Downloaded ${progress.receivedBytes} of ${progress.totalBytes} bytes.`,
        );
      },
    );
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <CustomErrorBoundary>
            <RootNavigation />
          </CustomErrorBoundary>
        </QueryClientProvider>
        {/* @ts-ignore */}
        <Toast config={toastMessageConfig} />
      </PersistGate>
    </Provider>
  );
}

let codePushOptions = { checkFrequency: CodePush.CheckFrequency.ON_APP_START };

export default CodePush(codePushOptions)(App);

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
