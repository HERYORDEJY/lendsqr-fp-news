import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomActivityIndicator from '~/components/general/CustomActivityIndicator';
import CustomRefreshControl from '~/components/general/CustomRefreshControl';
import CustomScreenContainer from '~/components/general/CustomScreenContainer';
import NewsItem from '~/components/news/NewsItem';
import NewsTopHeadlinesList from '~/components/news/NewsTopHeadlinesList';
import { useThemeColors } from '~/hooks/useThemeColors';
import { useToastMessage } from '~/hooks/useToastMessage';
import { NewsStackParamList } from '~/navigations/types';
import { newsApiRequest } from '~/services/news';
import { useAppDispatch, useAppSelector } from '~/store';
import {
  setBookmarkedNewsAction,
  setEverythingNewsAction,
} from '~/store/news/slice';
import { NewsArticleDataType } from '~/store/news/types';
import { appThemeColors } from '~/styles/colors';
import { appFontFamily } from '~/styles/fonts';
import { isDataEmpty } from '~/utils/format';

export default function NewsListing() {
  const authStore = useAppSelector(state => state.authentication);
  const newsStore = useAppSelector(state => state.news);
  const appDispatch = useAppDispatch();

  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [isRefreshingNews, setIsRefreshingNews] = useState(false);
  const toastMessage = useToastMessage();
  const { main } = useThemeColors();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<NewsStackParamList, 'NewsListing'>
    >();

  const keyExtractor = useCallback(
    (item: NewsArticleDataType, index: number) => {
      return `${item.title} ${item.url} ${index}`;
    },
    [],
  );

  const getEverythingNews = async () => {
    try {
      const res = await newsApiRequest.getEverything();
      return res.data;
    } catch (error: any) {
      toastMessage.error({ message: error.message });
    }
  };

  const getBookmarkedNews = async () => {
    await firestore()
      .collection('bookmarkedNews')
      .doc(authStore?.user?.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const bookmarkedNews = documentSnapshot.data() as {
            urls: Array<string>;
          };
          appDispatch(setBookmarkedNewsAction(bookmarkedNews));
        }
      });
  };

  const onRefresh = () => {
    setIsRefreshingNews(true);
    getEverythingNews().then(() => setIsRefreshingNews(false));
  };

  const renderListItem: ListRenderItem<NewsArticleDataType> = useCallback(
    ({ item, index }) => {
      // @ts-ignore
      return <NewsItem news={item} index={index} />;
    },
    [],
  );

  const renderListHeader = useCallback(() => {
    if (!isLoadingNews && isDataEmpty(newsStore.topHeadlines)) {
      return null;
    }

    // @ts-ignore
    return (
      <View style={{ rowGap: 24 }}>
        <View style={styles.topWrapper}>
          <Text style={styles.topHeadlineTitle}>Top Headlines</Text>
          <NewsTopHeadlinesList initiateReload={isLoadingNews} />
        </View>
        <Text style={[styles.topHeadlineTitle, {}]}>All News</Text>
      </View>
    );
  }, [isLoadingNews, newsStore.topHeadlines?.length]);

  useEffect(() => {
    getEverythingNews().then(data => {
      if (data.articles) {
        appDispatch(setEverythingNewsAction(data.articles));
        setIsLoadingNews(false);
        getBookmarkedNews();
      }
    });
  }, []);

  if (isLoadingNews && isDataEmpty(newsStore.everything)) {
    return <CustomActivityIndicator />;
  }

  if (isDataEmpty(newsStore.everything)) {
    return null;
  }

  return (
    <CustomScreenContainer isTopSafeArea={false}>
      <FlashList
        contentInsetAdjustmentBehavior="automatic"
        data={newsStore.everything}
        renderItem={renderListItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{
          ...styles.contentContainer,
          paddingTop: isDataEmpty(newsStore.topHeadlines) ? 10 : 24,
        }}
        estimatedItemSize={100}
        refreshControl={
          <CustomRefreshControl
            refreshing={isRefreshingNews}
            onRefresh={onRefresh}
          />
        }
        ListHeaderComponent={renderListHeader}
      />
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 24,
    backgroundColor: 'transparent',
  },
  topWrapper: {},
  topHeadlineTitle: {
    fontFamily: appFontFamily.semiBold,
    fontSize: 18,
    color: appThemeColors.LIGHT.colorFromLogo.gray1,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
});
