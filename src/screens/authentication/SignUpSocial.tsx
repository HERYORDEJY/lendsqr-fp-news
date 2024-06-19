import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import AuthScreenHeader from '~/components/authententication/AuthScreenHeader';
import PrimaryButton from '~/components/buttons/PrimaryButtom';
import SocialAuthButton from '~/components/buttons/SocialAuthButton';
import CustomActionSheetContainer from '~/components/general/CustomActionSheetContainer';
import CustomScreenContainer from '~/components/general/CustomScreenContainer';
import PasswordInput from '~/components/inputs/PasswordInput';
import { useThemeColors } from '~/hooks/useThemeColors';
import { useToastMessage } from '~/hooks/useToastMessage';
import { AuthenticationStackParamList } from '~/navigations/types';
import { useAppDispatch } from '~/store';
import { setAuthStoreStateAction } from '~/store/auth/authSlice';
import { appFontFamily } from '~/styles/fonts';
import { isAndroidDevice } from '~/utils/device';
import { generateRandomHex } from '~/utils/generate';
import {
  sendVerificationCode,
  updatePhoneNumber,
} from '~/utils/phone-number-service';

export default function SignUpSocial() {
  const { text } = useThemeColors();
  const appDispatch = useAppDispatch();
  const { button, input } = useThemeColors();
  const [loading, setLoading] = useState(false);
  const toastMessage = useToastMessage();
  const navigation =
    useNavigation<
      NavigationProp<AuthenticationStackParamList, 'SignUpSocial'>
    >();
  const route =
      useRoute<RouteProp<AuthenticationStackParamList, 'SignUpSocial'>>(),
    form = JSON.parse(route.params.form);

  const phoneVerifySheetRef = useRef<ActionSheetRef | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState(null);
  const [isRequestingCode, setIsRequestingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const onRequestPhoneVerificationCode = async () => {
    setIsRequestingCode(true);
    const phoneNumber = form.phoneNumber;
    try {
      const confirmation = await sendVerificationCode(phoneNumber);
      setVerificationId(confirmation.verificationId);
      toastMessage.success({
        message: `Verification code sent to ${phoneNumber}`,
      });
      phoneVerifySheetRef.current?.show();
      setIsRequestingCode(false);
    } catch (error) {
      console.error('Failed to send verification code:', error);
      toastMessage.error({ message: 'Failed to send verification code.' });
      setIsRequestingCode(false);
    }
  };

  const onVerifyPhoneCode = async () => {
    setIsVerifyingCode(true);
    const phoneNumber = form.phoneNumber;
    if (verificationId) {
      try {
        await updatePhoneNumber(phoneNumber, verificationId, verificationCode);
        toastMessage.success({
          message: 'Phone number verified successfully!',
        });
        phoneVerifySheetRef.current?.hide();
        setIsVerifyingCode(false);
      } catch (error) {
        // console.error('Failed to verify code:', error);
        toastMessage.error({ message: 'Failed to verify code.' });
        setIsVerifyingCode(false);
      }
    } else {
      Alert.alert('Error', 'Please request a verification code first.');
    }
  };

  async function onSignUpGoogle(response: {
    additionalUserInfo: FirebaseAuthTypes.AdditionalUserInfo | undefined;
    user: FirebaseAuthTypes.User;
  }) {
    setLoading(true);
    const { user, additionalUserInfo } = response;
    try {
      const photoUrl = `https://gravatar.com/avatar/${generateRandomHex()}?s=400&d=robohash&r=x`;

      // Update user profile with additional info
      await user.updateProfile({
        displayName: form.fullName,
        photoURL: photoUrl,
      });

      await firestore().collection('users').doc(user.uid).set({
        fullName: form.fullName,
        phoneNumber: form.phoneNumber,
        emailAddress: form.email,
        photoUrl,
      });

      appDispatch(
        setAuthStoreStateAction({
          additionalUserInfo,
          user: {
            displayName: user.displayName,
            multiFactor: user.multiFactor!,
            isAnonymous: user.isAnonymous,
            emailVerified: user.emailVerified,
            providerData: user.providerData,
            uid: user.uid,
            email: form.email,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            metadata: user.metadata,
            providerId: user.providerId,
          },
          bio: {
            fullName: form.fullName,
            phoneNumber: form.phoneNumber,
            emailAddress: form.email,
            photoUrl,
          },
          isLoggedIn: true,
        }),
      );

      toastMessage.success({ message: 'Account created successfully' });

      setLoading(false);
    } catch (error: any) {
      toastMessage.error({ message: error.message ?? JSON.stringify(error) });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <CustomScreenContainer>
        <View style={[styles.container]}>
          <AuthScreenHeader
            title="Google Sign up"
            description=" Please select your preferred google account to continue."
          />

          <View style={[styles.form]}>
            <SocialAuthButton type="google" onSignInGoogle={onSignUpGoogle} />
          </View>
        </View>
        <Pressable
          disabled={loading}
          style={[
            styles.dontButton,
            { paddingBottom: isAndroidDevice ? 16 : 0 },
          ]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[styles.dontText, { color: text?.secondary }]}>
            {' '}
            Already have an account?{' '}
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
            Sign In
          </Text>
        </Pressable>
      </CustomScreenContainer>
      <ActionSheet ref={phoneVerifySheetRef}>
        <CustomActionSheetContainer
          sheetRef={phoneVerifySheetRef}
          title="Phone Number Verification"
          containerStyle={{ rowGap: 32 }}
        >
          <ScrollView style={styles.phoneVerifContainer}>
            <AuthScreenHeader
              title="Phone Verification"
              description=" Please the code sent to the provided phone number."
            />
            <View style={[styles.form, { marginVertical: 32 }]}>
              <PasswordInput
                label="Phone Verification code"
                onChangeText={setVerificationCode}
                errorMessage={verificationCodeError}
                value={verificationCode}
                placeholder="Enter your verification code here."
                maxLength={6}
              />
            </View>
          </ScrollView>
          <PrimaryButton
            disabled={verificationCode.length !== 6}
            isLoading={isVerifyingCode}
            title="Submit"
            onPress={onVerifyPhoneCode}
            containerStyle={{ marginHorizontal: 20 }}
          />
        </CustomActionSheetContainer>
      </ActionSheet>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contentContainer: { paddingHorizontal: 20, paddingVertical: 40 },
  container: {
    rowGap: 24,
    paddingHorizontal: 20,
    paddingVertical: 40,
    flex: 1,
    justifyContent: 'center',
  },

  form: {
    rowGap: 16,
    marginBottom: 16,
  },
  pageHeader: {
    marginBottom: 16,
    rowGap: 8,
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
  phoneVerifContainer: {
    padding: 20,
  },
});

const _ = {
  additionalUserInfo: {
    profile: null,
    username: null,
    providerId: 'password',
    isNewUser: false,
  },
  user: {
    displayName: 'Ayodeji Yusuf',
    multiFactor: { enrolledFactors: [] },
    isAnonymous: false,
    emailVerified: false,
    providerData: [
      {
        email: 'heryordejy.dev@gmail.com',
        providerId: 'password',
        uid: 'heryordejy.dev@gmail.com',
        displayName: 'Ayodeji Yusuf',
      },
    ],
    uid: '11OLdWdzHjRId7a3iFw3IQmFAuQ2',
    email: 'heryordejy.dev@gmail.com',
    refreshToken:
      'AMf-vBzgd4DyNMoCDF5u6gbZu6KKsLY_ctSKR-Z7_6q2uG8RtHstfo2Aihvyt9MURJHvwpEVPxuRXfKQMbr45eNSK6RGMIFV60bh_Y39Ztclt2D_f0_-LNtPtcgW38WwOCIrQnRUSKhkQZsesCxe3uvZA1tNg86i-erglokc2otkXCGWlPgNBohlMvdWPhQmTyIseRU_xjKjczUn2VZx_cInXAoVrHzHJH0zo_emyg4WTJE-mpwqiH-RyO1O485X-0JCC3HUVbTdov1DlsEyMDJipEtyS3MEDQ',
    tenantId: null,
    phoneNumber: null,
    photoURL: null,
    metadata: { creationTime: 1718353788529, lastSignInTime: 1718353788529 },
    providerId: 'firebase',
  },
  phoneVerifContainer: {
    padding: 20,
  },
};
