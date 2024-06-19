import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import CustomFastImage from '~/components/general/CustomFastImage';
import BookmarkCircledIcon from '~/components/svgs/BookmarkCircledIcon';
import BookmarkFilledIcon from '~/components/svgs/BookmarkFilledIcon';
import BookmarkOutlinedIcon from '~/components/svgs/BookmarkOutlinedIcon';
import CrashIcon from '~/components/svgs/CrashIcon';
import { useThemeColors } from '~/hooks/useThemeColors';
import { useToastMessage } from '~/hooks/useToastMessage';
import BookmarkedNewsListing from '~/screens/news/BookmarkedNewsListing';
import NewsDetails from '~/screens/news/NewsDetails';
import NewsListing from '~/screens/news/NewsListing';
import Profile from '~/screens/profile/Profile';
import { useAppDispatch, useAppSelector } from '~/store';
import { addBookmarkAction, removeBookmarkAction } from '~/store/news/slice';
import { NewsArticleDataType } from '~/store/news/types';
import { appThemeColors } from '~/styles/colors';
import { appFontFamily } from '~/styles/fonts';
import { isAndroidDevice } from '~/utils/device';
import { NewsStackParamList } from './types';

const { Navigator, Screen } = createNativeStackNavigator<NewsStackParamList>();

export default function NewsStack() {
  const { colors, tabBar } = useThemeColors();
  const authenticationStore = useAppSelector(state => state.authentication);
  const toastMessage = useToastMessage();
  const newsStore = useAppSelector(state => state.news);
  const appDispatch = useAppDispatch();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<NewsStackParamList, 'NewsListing'>
    >();

  const onAddBookmarkToFirebase = async (url: string) => {
    const docRef = firestore()
      .collection('bookmarkedNews')
      .doc(authenticationStore.user?.uid);

    try {
      await docRef
        .update({
          urls: firestore.FieldValue.arrayUnion(url),
        })
        .then(() => appDispatch(addBookmarkAction(url)));
      toastMessage.success({ message: 'News bookmarked successfully' });
    } catch (error) {
      toastMessage.error({ message: `Unable to bookmark news:', ${error}` });
    }
  };

  const onRemoveBookmarkFromFirebase = async (urlToRemove: string) => {
    const docRef = firestore()
      .collection('bookmarkedNews')
      .doc(authenticationStore.user?.uid);

    try {
      const doc = await docRef.get();
      let urls = doc.data()?.urls;
      urls = urls?.filter?.((url: string) => url !== urlToRemove);

      await docRef
        .update({ urls })
        .then(() => appDispatch(removeBookmarkAction(urlToRemove)));
      toastMessage.success({ message: 'Removed bookmarked successfully' });
    } catch (error) {
      toastMessage.error({ message: `Unable to remove bookmark:', ${error}` });
    }
  };

  const onThrowError = () => {
    throw new Error('This is a test runtime error');
  };

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
              <View style={[styles.itemRow, { rowGap: 12 }]}>
                <TouchableOpacity
                  style={[styles.bookmarkButton]}
                  onPress={() => navigation.navigate('BookmarkedNewsListing')}
                >
                  <BookmarkCircledIcon color={colors.colorFromLogo.brown} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.bookmarkButton, { alignItems: 'flex-end' }]}
                  onPress={onThrowError}
                >
                  <CrashIcon />
                </TouchableOpacity>
              </View>
            );
          },
          headerLeft(props) {
            return (
              <TouchableOpacity
                style={[
                  styles.profileImageButton,
                  {
                    backgroundColor: colors.colorFromLogo.brown,
                    marginRight: isAndroidDevice ? 20 : 0,
                    marginBottom: !isAndroidDevice ? 20 : 0,
                  },
                ]}
                onPress={() => navigation.navigate('Profile')}
              >
                <CustomFastImage
                  imageUri={
                    authenticationStore?.user?.photoURL ??
                    authenticationStore.bio?.photoUrl
                  }
                  style={{ aspectRatio: 1 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Screen
        name="BookmarkedNewsListing"
        component={BookmarkedNewsListing}
        options={{
          headerTitle: 'Bookmarked News',
          headerLargeTitle: false,
          headerBackTitleVisible: false,
          headerRight(props) {
            return (
              <TouchableOpacity
                style={[
                  styles.profileImageButton,
                  { backgroundColor: colors.colorFromLogo.brown },
                ]}
                onPress={() => navigation.navigate('Profile')}
              >
                <CustomFastImage
                  imageUri={
                    authenticationStore?.user?.photoURL ??
                    authenticationStore.bio?.photoUrl
                  }
                  style={{ aspectRatio: 1 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Screen
        name="NewsDetails"
        component={NewsDetails}
        initialParams={{ isLoadingWebpage: true }}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: '',
          headerRight(props) {
            const news: NewsArticleDataType = JSON.parse(route.params.news);
            const isNewsBookmarked = () =>
              Boolean(
                newsStore.bookmarkedNews?.urls.find?.(url => url === news.url),
              );

            const onToggleBookmark = async () => {
              if (isNewsBookmarked()) {
                await onRemoveBookmarkFromFirebase(news.url);
                return;
              }
              await onAddBookmarkToFirebase(news.url);
            };

            return (
              <View style={styles.itemRow}>
                <TouchableOpacity
                  style={styles.bookmarkButton}
                  onPress={onToggleBookmark}
                >
                  {isNewsBookmarked() ? (
                    <BookmarkFilledIcon color={colors.colorFromLogo.red} />
                  ) : (
                    <BookmarkOutlinedIcon color={'#AAAAAA'} />
                  )}
                </TouchableOpacity>
              </View>
            );
          },
        })}
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
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  bookmarkButton: {
    height: 40,
    width: 40,
    borderRadius: 48,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
