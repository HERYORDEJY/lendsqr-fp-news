import { firebase } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CodePush from 'react-native-code-push';
import CustomActivityIndicator from '~/components/general/CustomActivityIndicator';
import CustomFastImage from '~/components/general/CustomFastImage';
import CustomScreenContainer from '~/components/general/CustomScreenContainer';
import CustomSectionWrapper from '~/components/general/CustomSectionWrapper';
import SectionDivider from '~/components/general/SectionDivider';
import LogoutIcon from '~/components/svgs/LogoutIcon';
import { useThemeColors } from '~/hooks/useThemeColors';
import { useAppDispatch, useAppSelector } from '~/store';
import { switchThemeModeAction } from '~/store/theme/themeSlice';
import { appFontFamily } from '~/styles/fonts';
import auth from '@react-native-firebase/auth';

export default function Profile() {
  const authenticationStore = useAppSelector(state => state.authentication);
  const appDispatch = useAppDispatch();
  const { colors, text, mode } = useThemeColors();
  const [isCheckingForUpdate, setIsCheckingForUpdate] = useState(false);

  const onSwitchTheme = () => {
    appDispatch(switchThemeModeAction());
  };

  const onLogOut = async () => {
    appDispatch({ type: 'LOGOUT' });
    await GoogleSignin.signOut();
    await firebase
      .auth()
      .signOut()
      .then(() => {
        //
      });
  };

  const onCheckForUpdate = () => {
    setIsCheckingForUpdate(true);
    CodePush.checkForUpdate()
      .then(update => {
        console.log('update', update);
        if (update) {
          // setUpdateInfo(update);
          return Alert.alert(
            'Update Available',
            'An update is available. Would you like to install it?',
            [
              {
                text: 'Yes',
                onPress: () => {
                  CodePush.sync({
                    installMode: CodePush.InstallMode.IMMEDIATE,
                  });
                },
              },
              { text: 'No', onPress: () => {} },
            ],
          );
        } else {
          return Alert.alert('No Update Available', 'The app is up to date.');
        }
      })
      .finally(() => {
        setIsCheckingForUpdate(false);
      });
  };

  const updatePhone = async () => {
    //
    const user = auth().currentUser;
    if (user) {
      await user.updateProfile({ phoneNumber });
      console.log('Phone number updated successfully!');
    }
  };

  return (
    <CustomScreenContainer isTopSafeArea={false}>
      <View style={styles.container}>
        <View style={styles.bioSectionWrapper}>
          <View
            style={[
              styles.profileImageButton,
              { backgroundColor: colors.colorFromLogo.brown },
            ]}
          >
            <CustomFastImage
              imageUri={
                authenticationStore.bio?.photoUrl ??
                authenticationStore?.user?.photoURL
              }
              style={{ aspectRatio: 1 }}
            />
          </View>
        </View>

        <CustomSectionWrapper
          title="Bio"
          contentStyle={{ marginHorizontal: 20 }}
        >
          <View style={styles.itemRow}>
            <Text style={[{ color: text.secondary }]}>Full Name</Text>
            <Text style={[{ fontFamily: appFontFamily.medium }]}>
              {authenticationStore.bio?.fullName ??
                authenticationStore.user?.displayName}
            </Text>
          </View>
          <SectionDivider style={{ flex: 0 }} />
          <View style={styles.itemRow}>
            <Text style={[{ color: text.secondary }]}>Email</Text>
            <Text style={[{ fontFamily: appFontFamily.medium }]}>
              {authenticationStore.bio?.emailAddress ??
                authenticationStore.user?.email}
            </Text>
          </View>
          {authenticationStore.bio?.phoneNumber ||
          authenticationStore.user?.phoneNumber ? (
            <>
              <SectionDivider style={{ flex: 0 }} />
              <View style={styles.itemRow}>
                <Text style={[{ color: text.secondary }]}>Phone Number</Text>
                <Text style={[{ fontFamily: appFontFamily.medium }]}>
                  {authenticationStore.bio?.phoneNumber ??
                    authenticationStore.user?.phoneNumber}
                </Text>
              </View>
            </>
          ) : null}
        </CustomSectionWrapper>

        <CustomSectionWrapper
          title="Settings"
          contentStyle={{ marginHorizontal: 20 }}
        >
          <TouchableOpacity style={styles.itemRow} onPress={onSwitchTheme}>
            <Text style={[{ color: text.secondary }]}>Dark Theme</Text>
            <Switch value={mode === 'DARK'} onValueChange={onSwitchTheme} />
          </TouchableOpacity>
          <SectionDivider style={{ flex: 0 }} />
          <TouchableOpacity
            style={styles.itemRow}
            onPress={onCheckForUpdate}
            disabled={isCheckingForUpdate}
          >
            <Text
              style={[
                {
                  color: text.secondary,
                  flex: 1,
                  opacity: isCheckingForUpdate ? 0.3 : 1,
                },
              ]}
            >
              Check for Update
            </Text>
            <CustomActivityIndicator
              isLoading={isCheckingForUpdate}
              size={'small'}
              style={{
                height: 10,
                alignItems: 'flex-end',
                backgroundColor: 'transparent',
              }}
            />
          </TouchableOpacity>
        </CustomSectionWrapper>

        <CustomSectionWrapper
          containerStyle={{ marginTop: 48 }}
          contentStyle={{ marginHorizontal: 20, borderWidth: 0, padding: 0 }}
        >
          <TouchableOpacity
            style={[
              styles.itemRow,
              { justifyContent: 'flex-start', columnGap: 4, padding: 16 },
            ]}
            onPress={onLogOut}
          >
            <LogoutIcon />
            <Text style={[{ color: colors.error }]}>Logout</Text>
          </TouchableOpacity>
        </CustomSectionWrapper>
      </View>

      <Button title="000" onPress={updatePhone} />
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    rowGap: 20,
  },
  bioSectionWrapper: {},
  profileImageButton: {
    height: 140,
    width: 140,
    borderRadius: 148,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
