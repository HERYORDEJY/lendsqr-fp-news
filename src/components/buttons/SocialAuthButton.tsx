import { appleAuth } from '@invertase/react-native-apple-authentication';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Config from 'react-native-config';
import AppleIcon from '~/components/svgs/AppleIcon';
import GoogleIcon from '~/components/svgs/GoogleIcon';
import { useToastMessage } from '~/hooks/useToastMessage';
import { useAppDispatch } from '~/store';
import { appFontFamily } from '~/styles/fonts';

const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: Config.GOOGLE_WEB_CLIENT_ID, //`autoDetect`,
  });
};

interface Props extends TouchableOpacityProps {
  title?: string;
  type: 'google' | 'apple';
  onSignInGoogle?: (response: {
    additionalUserInfo: FirebaseAuthTypes.AdditionalUserInfo | undefined;
    user: FirebaseAuthTypes.User;
  }) => void;
}

export default function SocialAuthButton(props: Props) {
  const navigation: any = useNavigation();
  const appDispatch = useAppDispatch();
  const [isContinuingGoogle, setIsContinuingGoogle] = useState(false);
  const [isContinuingApple, setIsContinuingApple] = useState(false);
  const route: any = useRoute();
  const toastMessage = useToastMessage();
  const share = route?.params?.share;
  const eventId = route?.params?.eventId;

  const isAppleType = props.type === 'apple';
  const isGoogleType = props.type === 'google';
  const _title = isAppleType
    ? 'Continue with Apple'
    : isGoogleType
    ? 'Continue with Google'
    : props.title;

  const _styles = StyleSheet.create({
    container: {
      backgroundColor: isAppleType ? '#000000' : '#FFFFFF',
      borderWidth: isAppleType ? 0 : 1,
    },
    title: {
      color: isAppleType ? '#FFFFFF' : '#000000',
    },
  });

  const onContinueWithGoogle = async () => {
    // TODO: implement login with google
    try {
      setIsContinuingGoogle(true);
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const { user, additionalUserInfo } = await auth().signInWithCredential(
        googleCredential,
      );

      if (user.uid) {
        props.onSignInGoogle?.({ user, additionalUserInfo });
      } else {
        return toastMessage.error({
          title: 'Sign in error',
          message: 'Unable to sign in with the provided Google mail',
        });
      }
      setIsContinuingGoogle(false);
    } catch (error: any) {
      setIsContinuingGoogle(false);
      // console.log('\n\nonContinueWithGoogle error', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return toastMessage.error({
          title: 'Google sign in error',
          message: `Sign in cancelled`,
        });
      } else if (error.code === statusCodes.IN_PROGRESS) {
        return toastMessage.error({
          title: 'Google sign in error',
          message: `Sign in cancelled`,
        });
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return toastMessage.error({
          title: 'Google sign in error',
          message: `Play services not available`,
        });
      } else {
        return toastMessage.error({
          title: 'Google sign in error',
          message: `Sign in failed`,
        });
      }
    }
  };

  const onContinueWithApple = async () => {
    // TODO: implement login with apple support
    setIsContinuingApple(true); //
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
      } else {
        return toastMessage.error({
          title: 'Apple sign in error',
          message: 'No identity token.',
        });
      }
    } catch (error: any) {
      if (error.code === 'ERR_REQUEST_CANCELED') {
        // handle that the user canceled the sign-in flow
      } else {
        return toastMessage.error({
          title: 'Apple sign in error',
          message: `${error.message}`,
        });
      }
    } finally {
      setIsContinuingApple(false);
    }
  };

  const onPress = () => {
    if (isAppleType) {
      onContinueWithApple();
    } else {
      onContinueWithGoogle();
    }
  };

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  if (isAppleType && Platform.OS === 'android') {
    return null;
  }

  return (
    <TouchableOpacity
      {...props}
      style={[styles.container, _styles.container]}
      onPress={onPress}
    >
      {isAppleType ? <AppleIcon /> : isGoogleType ? <GoogleIcon /> : null}
      {isContinuingApple ? (
        <ActivityIndicator animating={isContinuingApple} color={'#FFFFFF'} />
      ) : isContinuingGoogle ? (
        <ActivityIndicator animating={isContinuingGoogle} color={'#000000'} />
      ) : (
        <Text style={[styles.title, _styles.title]}>{_title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    columnGap: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 16, color: 'white', fontFamily: appFontFamily.semiBold },
});
