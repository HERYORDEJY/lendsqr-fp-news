import { yupResolver } from '@hookform/resolvers/yup';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
import CustomActionSheetContainer from '~/components/general/CustomActionSheetContainer';
import CustomScreenContainer from '~/components/general/CustomScreenContainer';
import EmailInput from '~/components/inputs/EmailInput';
import PasswordInput from '~/components/inputs/PasswordInput';
import PhoneInput from '~/components/inputs/PhoneInput';
import CustomTextInput from '~/components/inputs/TextInput';
import UserIcon from '~/components/svgs/UserIcon';
import { useThemeColors } from '~/hooks/useThemeColors';
import { useToastMessage } from '~/hooks/useToastMessage';
import { AuthenticationStackParamList } from '~/navigations/types';
import { useAppDispatch } from '~/store';
import { appFontFamily } from '~/styles/fonts';
import { isAndroidDevice } from '~/utils/device';
import {
  sendVerificationCode,
  updatePhoneNumber,
} from '~/utils/phone-number-service';
import { signUpSchema } from '~/utils/yup-schema';

export default function SignUp() {
  const phoneVerifySheetRef = useRef<ActionSheetRef | null>(null);
  const { text } = useThemeColors();
  const appDispatch = useAppDispatch();
  const { button, input } = useThemeColors();
  const navigation =
    useNavigation<NavigationProp<AuthenticationStackParamList, 'SignUpBio'>>();
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState(null);
  const [isRequestingCode, setIsRequestingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);

  const route =
    useRoute<RouteProp<AuthenticationStackParamList, 'SignUpBio'>>();

  const [loading, setLoading] = useState(false);
  const toastMessage = useToastMessage();
  const formMethods = useForm({
      resolver: yupResolver(
        // @ts-ignore
        signUpSchema,
      ),
      defaultValues: {
        email: '',
        password: '',
      },
    }),
    formValues = formMethods.getValues(),
    formErrors = formMethods.formState.errors;

  const onRequestPhoneVerificationCode = async (values: typeof formValues) => {
    setIsRequestingCode(true);
    const phoneNumber = values.phoneNumber;
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
    const phoneNumber = formValues.phoneNumber;
    if (verificationId) {
      try {
        await updatePhoneNumber(phoneNumber, verificationId, verificationCode);
        toastMessage.success({
          message: 'Phone number verified successfully!',
        });
        phoneVerifySheetRef.current?.hide();
        setIsVerifyingCode(false);
        navigation.navigate('SignUpSocial', {
          form: JSON.stringify(formValues),
        });
      } catch (error) {
        console.error('Failed to verify code:', error);
        toastMessage.error({ message: 'Failed to verify code.' });
        setIsVerifyingCode(false);
      }
    } else {
      Alert.alert('Error', 'Please request a verification code first.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <CustomScreenContainer>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={[styles.container]}>
            <AuthScreenHeader
              title="Create Account"
              description=" Please enter your credentials to continue."
            />

            <View style={[styles.form]}>
              <Controller
                render={({ field }) => {
                  return (
                    <CustomTextInput
                      label="Full Name"
                      onChangeText={field.onChange}
                      errorMessage={formErrors.fullName?.message}
                      value={field.value}
                      placeholder="Enter your full name"
                      leftElement={<UserIcon color={input.iconColor} />}
                    />
                  );
                }}
                name={'fullName'}
                control={formMethods.control}
              />

              <Controller
                render={({ field }) => {
                  return (
                    <EmailInput
                      onChangeText={field.onChange}
                      errorMessage={formErrors.email?.message}
                      value={field.value}
                    />
                  );
                }}
                name={'email'}
                control={formMethods.control}
              />
              {/* <PhoneInput label="Phone" /> */}
              <Controller
                render={({ field }) => {
                  return (
                    <PhoneInput
                      label="Phone Number"
                      onChangeText={field.onChange}
                      errorMessage={formErrors.phoneNumber?.message}
                      value={field.value}
                      placeholder="Enter your phone number"
                    />
                  );
                }}
                name={'phoneNumber'}
                control={formMethods.control}
              />

              <Controller
                render={({ field }) => {
                  return (
                    <PasswordInput
                      onChangeText={field.onChange}
                      errorMessage={formErrors.password?.message}
                      value={field.value}
                    />
                  );
                }}
                name={'password'}
                control={formMethods.control}
              />

              <Controller
                render={({ field }) => {
                  return (
                    <PasswordInput
                      label="Confirm Password"
                      onChangeText={field.onChange}
                      errorMessage={formErrors.confirmPassword?.message}
                      value={field.value}
                    />
                  );
                }}
                name={'confirmPassword'}
                control={formMethods.control}
              />
            </View>

            <View>
              <PrimaryButton
                isLoading={isRequestingCode}
                title="Continue"
                // onPress={formMethods.handleSubmit(
                //   onRequestPhoneVerificationCode,
                // )}
                onPress={() => phoneVerifySheetRef.current?.show()}
                // disabled={loading || !formMethods.formState.isValid}
              />
            </View>
          </View>
        </ScrollView>
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
            isLoading={isRequestingCode}
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
