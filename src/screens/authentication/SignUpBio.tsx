import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import AuthScreenHeader from '~/components/authententication/AuthScreenHeader';
import PrimaryButton from '~/components/buttons/PrimaryButtom';
import CustomScreenContainer from '~/components/general/CustomScreenContainer';
import EmailInput from '~/components/inputs/EmailInput';
import PasswordInput from '~/components/inputs/PasswordInput';
import CustomTextInput from '~/components/inputs/TextInput';
import UserIcon from '~/components/svgs/UserIcon';
import { useThemeColors } from '~/hooks/useThemeColors';
import { useToastMessage } from '~/hooks/useToastMessage';
import { AuthenticationStackParamList } from '~/navigations/types';
import { useAppDispatch } from '~/store';
import { appFontFamily } from '~/styles/fonts';
import { isAndroidDevice } from '~/utils/device';
import { signUpSchema } from '~/utils/yup-schema';

export default function SignUp() {
  const { text } = useThemeColors();
  const appDispatch = useAppDispatch();
  const { button, input } = useThemeColors();
  const navigation =
    useNavigation<NavigationProp<AuthenticationStackParamList, 'SignUpBio'>>();

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

  async function signUpWithEmail(values: typeof formValues) {
    setLoading(true);
    try {
      //

      setLoading(false);
    } catch (error: any) {
      toastMessage.error({ message: error.message ?? JSON.stringify(error) });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  console.log('formErrors', formErrors);

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
                animating={loading}
                title="Sign Up"
                onPress={formMethods.handleSubmit(signUpWithEmail)}
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
    // fontSize: 40,
    // fontFamily:  'montserratBold',
    textAlign: 'center',
  },
  dontButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dontText: { fontSize: 16 },
});
