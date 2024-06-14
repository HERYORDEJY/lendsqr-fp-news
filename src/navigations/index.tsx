import appleAuth from '@invertase/react-native-apple-authentication';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, Text, TextInput } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import setDefaultProps from 'react-native-simple-default-props';
import { useThemeColors } from '~/hooks/useThemeColors';
import { useAppDispatch, useAppSelector } from '~/store';
import { appFontFamily } from '~/styles/fonts';
import { isAndroidDevice } from '~/utils/device';
import AuthenticationStack from './AuthenticationStack';

export default function RootNavigation() {
  const authSelector = useAppSelector(state => state.authentication);
  const appDispatch = useAppDispatch();
  const { text, input } = useThemeColors();

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
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return () => {
      if (isAndroidDevice) {
        return;
      }
      appleAuth.onCredentialRevoked(async () => {
        appDispatch({ type: 'LOGOUT' });
      });
    };
  }, []); //

  return (
    <NavigationContainer
      onReady={() => {
        BootSplash.hide();
      }}
    >
      <AuthenticationStack />
    </NavigationContainer>
  );
}
