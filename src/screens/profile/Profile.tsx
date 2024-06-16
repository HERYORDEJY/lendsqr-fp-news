import React from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import CustomFastImage from '~/components/general/CustomFastImage';
import CustomScreenContainer from '~/components/general/CustomScreenContainer';
import CustomSectionWrapper from '~/components/general/CustomSectionWrapper';
import SectionDivider from '~/components/general/SectionDivider';
import LogoutIcon from '~/components/svgs/LogoutIcon';
import { useThemeColors } from '~/hooks/useThemeColors';
import { useAppDispatch, useAppSelector } from '~/store';
import { switchThemeModeAction } from '~/store/theme/themeSlice';
import { appFontFamily } from '~/styles/fonts';

export default function Profile() {
  const authenticationStore = useAppSelector(state => state.authentication);
  const appDispatch = useAppDispatch();
  const { colors, text, mode } = useThemeColors();

  const onSwitchTheme = () => {
    appDispatch(switchThemeModeAction());
  };

  const onLogOut = () => appDispatch({ type: 'LOGOUT' });

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
              imageUri={authenticationStore.bio?.photoUrl}
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
              {authenticationStore.bio?.fullName}
            </Text>
          </View>
          <SectionDivider />
          <View style={styles.itemRow}>
            <Text style={[{ color: text.secondary }]}>Email</Text>
            <Text style={[{ fontFamily: appFontFamily.medium }]}>
              {authenticationStore.bio?.emailAddress}
            </Text>
          </View>
          <SectionDivider />
          <View style={styles.itemRow}>
            <Text style={[{ color: text.secondary }]}>Phone Number</Text>
            <Text style={[{ fontFamily: appFontFamily.medium }]}>
              {authenticationStore.bio?.phoneNumber}
            </Text>
          </View>
        </CustomSectionWrapper>

        <CustomSectionWrapper
          title="Settings"
          contentStyle={{ marginHorizontal: 20 }}
        >
          <TouchableOpacity style={styles.itemRow} onPress={onSwitchTheme}>
            <Text style={[{ color: text.secondary }]}>Dark Theme</Text>
            <Switch value={mode === 'DARK'} onValueChange={onSwitchTheme} />
          </TouchableOpacity>
        </CustomSectionWrapper>

        <CustomSectionWrapper
          containerStyle={{ marginTop: 48 }}
          contentStyle={{ marginHorizontal: 20, borderWidth: 0 }}
        >
          <TouchableOpacity
            style={[
              styles.itemRow,
              { justifyContent: 'flex-start', columnGap: 4 },
            ]}
            onPress={onLogOut}
          >
            <LogoutIcon />
            <Text style={[{ color: colors.error }]}>Logout</Text>
          </TouchableOpacity>
        </CustomSectionWrapper>
      </View>
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
