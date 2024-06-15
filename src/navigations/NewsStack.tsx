import { useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CustomFastImage from '~/components/general/CustomFastImage';
import { useThemeColors } from '~/hooks/useThemeColors';
import NewsDetails from '~/screens/news/NewsDetails';
import NewsListing from '~/screens/news/NewsListing';
import Profile from '~/screens/profile/Profile';
import { useAppSelector } from '~/store';
import { appThemeColors } from '~/styles/colors';
import { appFontFamily } from '~/styles/fonts';
import { NewsStackParamList } from './types';

const { Navigator, Screen } = createNativeStackNavigator<NewsStackParamList>();

export default function NewsStack() {
  const { colors, tabBar } = useThemeColors();
  const authenticationStore = useAppSelector(state => state.authentication);
  const navigation =
    useNavigation<
      NativeStackNavigationProp<NewsStackParamList, 'NewsListing'>
    >();

  return (
    <Navigator
      initialRouteName="NewsListing"
      screenOptions={{
        headerStyle: {
          backgroundColor: tabBar.backgroundColor,
        },
        headerTitleStyle: {
          fontFamily: appFontFamily.bold,
          color: appThemeColors.LIGHT.colorFromLogo?.red,
        },
        headerLargeTitleStyle: {
          fontFamily: appFontFamily.bold,
          color: appThemeColors.LIGHT.colorFromLogo?.red,
        },
      }}
    >
      <Screen
        name="NewsListing"
        component={NewsListing}
        options={{
          headerTitle: 'News',
          headerLargeTitle: true,

          headerRight(props) {
            return (
              <TouchableOpacity
                style={styles.profileImageButton}
                onPress={() => navigation.navigate('Profile')}
              >
                <CustomFastImage
                  imageUri={`https://gravatar.com/avatar/${authenticationStore.user?.uid}?s=400&d=robohash&r=x`}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Screen
        name="NewsDetails"
        component={NewsDetails}
        options={{ headerBackTitleVisible: false }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{ headerBackTitleVisible: false }}
      />
    </Navigator>
  );
}

const styles = StyleSheet.create({
  profileImageButton: {
    height: 40,
    width: 40,
    borderRadius: 48,
    overflow: 'hidden',
  },
});
