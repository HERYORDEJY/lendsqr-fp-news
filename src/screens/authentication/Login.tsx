import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AuthScreenHeader from '~/components/authententication/AuthScreenHeader';
import SocialAuthButton from '~/components/buttons/SocialAuthButton';
import CustomScreenContainer from '~/components/general/CustomScreenContainer';
import { useThemeColors } from '~/hooks/useThemeColors';
import { useToastMessage } from '~/hooks/useToastMessage';
import { AuthenticationStackParamList } from '~/navigations/types';
import { useAppDispatch } from '~/store';
import { setAuthStoreStateAction } from '~/store/auth/authSlice';
import { appFontFamily } from '~/styles/fonts';
import { isAndroidDevice } from '~/utils/device';

export default function Login() {
  const [isLoginIn, setIsLoginIn] = useState(false);
  const appDispatch = useAppDispatch();
  const { button } = useThemeColors();
  const toastMessage = useToastMessage();
  const { text } = useThemeColors();

  const navigation =
    useNavigation<NavigationProp<AuthenticationStackParamList, 'Login'>>();

  async function onSignInGoogle(response: {
    additionalUserInfo: FirebaseAuthTypes.AdditionalUserInfo | undefined;
    user: FirebaseAuthTypes.User;
  }) {
    try {
      setIsLoginIn(true);
      const { user, additionalUserInfo } = response;

      await firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            const bio = documentSnapshot.data();
            appDispatch(
              setAuthStoreStateAction({
                user: {
                  displayName: user.displayName,
                  multiFactor: user.multiFactor!,
                  isAnonymous: user.isAnonymous,
                  emailVerified: user.emailVerified,
                  providerData: user.providerData,
                  uid: user.uid,
                  email: user.email,
                  phoneNumber: user.phoneNumber,
                  photoURL: user.photoURL,
                  metadata: user.metadata,
                  providerId: user.providerId,
                },
                additionalUserInfo,
                bio,
                isLoggedIn: true,
              }),
            );
          } else {
            toastMessage.error({
              message: 'You are required to sign up.',
            });
            navigation.navigate('SignUpBio');
          }
        });
    } catch (error: any) {
      // console.log('\n\nerror.message', error);
      toastMessage.error({
        message: error.message,
      });
    } finally {
      setIsLoginIn(false);
    }
  }

  return (
    <CustomScreenContainer>
      <View style={[styles.container]}>
        <AuthScreenHeader
          title="Welcome back"
          description="Please select your registered google account to continue."
        />

        <View style={[styles.form]}>
          <SocialAuthButton type="google" onSignInGoogle={onSignInGoogle} />
        </View>
      </View>
      <Pressable
        disabled={isLoginIn}
        style={[styles.dontButton, { paddingBottom: isAndroidDevice ? 16 : 0 }]}
        onPress={() => navigation.navigate('SignUpBio')}
      >
        <Text style={[styles.dontText, { color: text?.secondary }]}>
          Don't have an account?{' '}
        </Text>
        <Text
          style={[
            styles.dontText,
            {
              color: button.primary.background,
              fontFamily: appFontFamily.medium,
            },
          ]}
        >
          Sign Up
        </Text>
      </Pressable>
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  contentContainer: {},
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    rowGap: 24,
    justifyContent: 'center',
    flex: 1,
  },

  accountText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  forgotPassword: {
    marginVertical: 5,
    marginLeft: 'auto',
  },
  forgotPasswordText: {
    fontFamily: appFontFamily.medium,
  },

  socialAuthWrapper: {
    rowGap: 16,
  },
  form: {
    rowGap: 16,
  },
  pageHeader: {
    marginBottom: 16,
  },
  pageHeaderTitle: {
    fontSize: 40,
    fontFamily: appFontFamily.bold,
    textAlign: 'center',
    marginBottom: 7,
  },
  pageHeaderSubtitle: {
    textAlign: 'center',
  },
  dontButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dontText: { fontSize: 16 },
  orButton: { marginLeft: 0, alignSelf: 'center' },
});
