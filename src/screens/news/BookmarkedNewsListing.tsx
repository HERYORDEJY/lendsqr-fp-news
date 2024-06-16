import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import CustomActivityIndicator from '~/components/general/CustomActivityIndicator';
import CustomDataListEmpty from '~/components/general/CustomDataListEmpty';
import CustomScreenContainer from '~/components/general/CustomScreenContainer';
import NewsItem from '~/components/news/NewsItem';
import { useThemeColors } from '~/hooks/useThemeColors';
import { NewsStackParamList } from '~/navigations/types';
import { newsApiRequest } from '~/services/news';
import { useAppSelector } from '~/store';
import { NewsArticleDataType } from '~/store/news/types';
import { appThemeColors } from '~/styles/colors';
import { appFontFamily } from '~/styles/fonts';
import { isDataEmpty } from '~/utils/format';

export default function BookmarkedNewsListing() {
  const authStore = useAppSelector(state => state.authentication);
  const newsStore = useAppSelector(state => state.news);
  const { main } = useThemeColors();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<NewsStackParamList, 'NewsListing'>
    >();

  const keyExtractor = useCallback((item: string, index: number) => {
    return `${item} ${index}`;
  }, []);

  const getEverythingQuery = useQuery({
      queryKey: ['news', 'everything'],
      queryFn: () => newsApiRequest.getEverything(),
    }),
    getTopHeadlinesQuery = useQuery({
      queryKey: ['news', 'top-headlines'],
      queryFn: () => newsApiRequest.getTopHeadlines(),
    });

  const renderListItem: ListRenderItem<string> = useCallback(
    ({ item, index }) => {
      // @ts-ignore
      const news: NewsArticleDataType = [
        ...(newsStore.everything ?? []),
        ...(newsStore.topHeadlines ?? []),
      ].find((article: NewsArticleDataType) => article.url === item);

      if (!Boolean(news?.url)) {
        return null;
      }

      return <NewsItem news={news} index={index} />;
    },
    [],
  );

  if (getEverythingQuery.isLoading) {
    return <CustomActivityIndicator />;
  }

  if (isDataEmpty(newsStore.bookmarkedNews?.urls)) {
    return (
      <CustomDataListEmpty
        title="No bookmarks"
        description="You have not bookmarked any new yet"
      />
    );
  }

  return (
    <CustomScreenContainer isTopSafeArea={false}>
      <FlashList
        contentInsetAdjustmentBehavior="automatic"
        data={newsStore.bookmarkedNews?.urls}
        renderItem={renderListItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
        estimatedItemSize={100}
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
