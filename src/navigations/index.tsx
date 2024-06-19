import { firebase } from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import setDefaultProps from 'react-native-simple-default-props';
import CustomScreenContainer from '~/components/general/CustomScreenContainer';
import { useThemeColors } from '~/hooks/useThemeColors';
import { useAppDispatch, useAppSelector } from '~/store';
import { appFontFamily } from '~/styles/fonts';
import AuthenticationStack from './AuthenticationStack';
import NewsStack from './NewsStack';

export default function RootNavigation() {
  const authSelector = useAppSelector(state => state.authentication);
  const appDispatch = useAppDispatch();
  const { text, input } = useThemeColors();
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user: any) => {
    // if (user) {
    //   appDispatch(
    //     setAuthStoreStateAction(
    //       user
    //         ? {
    //             user: {
    //               displayName: user.displayName,
    //               multiFactor: user.multiFactor!,
    //               isAnonymous: user.isAnonymous,
    //               emailVerified: user.emailVerified,
    //               providerData: user.providerData,
    //               uid: user.uid,
    //               email: user.email,
    //               phoneNumber: user.phoneNumber,
    //               photoURL: user.photoURL,
    //               metadata: user.metadata,
    //               providerId: user.providerId,
    //               // refreshToken: user.refreshToken,
    //               tenantId: user.tenantId,
    //             },
    //             isLoggedIn: true,
    //           }
    //         : { user: null, isLoggedIn: false },
    //     ),
    //   );
    // }

    if (initializing) {
      setInitializing(false);
    }
  };

  const onAppReady = () => {
    if (!initializing) BootSplash.hide();
  };

  setDefaultProps(Text, {
    style: {
      fontSize: 14,
      fontFamily: appFontFamily.regular,
      color: text?.primary,
    },
    allowFontScaling: false,
  });

  setDefaultProps(ScrollView, {
    showsVerticalScrollIndicator: false,
    showsHorizontalScrollIndicator: false,
    allowFontScaling: false,
    bounce: false,
    bounces: false,
  });

  // RN TextInput component default props
  setDefaultProps(TextInput, {
    style: {
      fontSize: 16,
      fontFamily: appFontFamily.regular,
      backgroundColor: 'transparent',
      color: input.textColor,
    },
    // placeholderTextColor: globalStyles.colors.colorsGrayGray50,
    underlineColorAndroid: 'transparent',
    allowFontScaling: false,
    cursorColor: input.cursorColor,
  });

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing)
    return (
      <CustomScreenContainer
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFF',
        }}
      >
        <View style={{ height: 100, width: 100 }}>
          <Image
            source={require('../assets/images/news-logo.png')}
            style={{ flex: 1, width: undefined, height: undefined }}
          />
        </View>
      </CustomScreenContainer>
    );

  return (
    <NavigationContainer onReady={onAppReady}>
      {authSelector.isLoggedIn && authSelector.user?.uid ? (
        <NewsStack />
      ) : (
        <AuthenticationStack />
      )}
    </NavigationContainer>
  );
}
