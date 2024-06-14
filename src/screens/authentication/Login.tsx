import { yupResolver } from '@hookform/resolvers/yup';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AuthScreenHeader from '~/components/authententication/AuthScreenHeader';
import PrimaryButton from '~/components/buttons/PrimaryButtom';
import SocialAuthButton from '~/components/buttons/SocialAuthButton';
import CustomScreenContainer from '~/components/general/CustomScreenContainer';
import EmailInput from '~/components/inputs/EmailInput';
import PasswordInput from '~/components/inputs/PasswordInput';
import { useThemeColors } from '~/hooks/useThemeColors';
import { useToastMessage } from '~/hooks/useToastMessage';
import { AuthenticationStackParamList } from '~/navigations/types';
import { useAppDispatch } from '~/store';
import { appThemeColors } from '~/styles/colors';
import { appFontFamily } from '~/styles/fonts';
import { isAndroidDevice } from '~/utils/device';
import { logInEmailSchema } from '~/utils/yup-schema';

export default function Login() {
  const [isLoginIn, setIsLoginIn] = useState(false);
  const appDispatch = useAppDispatch();
  const toastMessage = useToastMessage();
  const { text } = useThemeColors();
  const formMethods = useForm({
      resolver: yupResolver(
        // @ts-ignore
        logInEmailSchema,
      ),
      // defaultValues: {
      //   email: "",
      //   password: "",
      // },
    }),
    formValues = formMethods.getValues(),
    formErrors = formMethods.formState.errors;
  const navigation =
    useNavigation<NavigationProp<AuthenticationStackParamList, 'Login'>>();

  async function onLogIn(values: typeof formValues) {
    setIsLoginIn(true);
    try {
      appDispatch(
        //@ts-ignore
        authStoreActions.setState({
          // session: data.session!,
          // userRole: route.params.userRole!,
          isInSession: true,
        }),
      );
    } catch (error: any) {
      toastMessage.error({
        message: error.message ?? JSON.stringify(error),
      });
    } finally {
      setIsLoginIn(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <CustomScreenContainer>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={[styles.container]}>
            <AuthScreenHeader
              title="Welcome back"
              description="Please enter your credentials to continue."
            />

            <View style={[styles.form]}>
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

              <View style={[styles.form]}>
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
              </View>
            </View>

            <Pressable
              disabled={isLoginIn}
              style={styles.forgotPassword}
              onPress={() => {
                // navigation.navigate('ForgotPassword', {
                //   userRole: route.params.userRole,
                // })
              }}
            >
              <Text
                style={[styles.forgotPasswordText, { color: text?.primary }]}
              >
                Forgot Password?
              </Text>
            </Pressable>

            <PrimaryButton
              containerStyle={{ marginTop: 16 }}
              onPress={formMethods.handleSubmit(onLogIn)}
              isLoading={isLoginIn}
              title="Sign In"
              // disabled={isSigninEmail || !formMethods.formState.isValid}
            />
            <>
              <View style={[styles.orButton, ,]}>
                <Text
                  style={[
                    styles.forgotPasswordText,
                    { color: text?.secondary },
                  ]}
                >
                  or
                </Text>
              </View>
              <View style={styles.socialAuthWrapper}>
                <SocialAuthButton type="google" />
                <SocialAuthButton type="apple" />
              </View>
            </>
          </View>
        </ScrollView>
        <Pressable
          disabled={isLoginIn}
          style={[
            styles.dontButton,
            { paddingBottom: isAndroidDevice ? 16 : 0 },
          ]}
          onPress={() => navigation.navigate('SignUpBio')}
        >
          <Text style={[styles.dontText, { color: text?.secondary }]}>
            Don't have an account?{' '}
          </Text>
          <Text
            style={[
              styles.dontText,
              {
                color: appThemeColors.LIGHT.colorFromLogo.red,
                fontFamily: appFontFamily.medium,
              },
            ]}
          >
            Sign Up
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

  accountText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // marginBottom: 21,
  },
  forgotPassword: {
    marginVertical: 5,
    marginLeft: 'auto',
    // marginRight: 26,
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
  orButton: { marginLeft: 0, alignSelf: 'center' },
});
