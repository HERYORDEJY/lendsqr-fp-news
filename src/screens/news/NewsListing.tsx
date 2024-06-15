import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomActivityIndicator from '~/components/general/CustomActivityIndicator';
import CustomRefreshControl from '~/components/general/CustomRefreshControl';
import CustomScreenContainer from '~/components/general/CustomScreenContainer';
import NewsItem from '~/components/news/NewsItem';
import NewsTopHeadlinesList from '~/components/news/NewsTopHeadlinesList';
import { useThemeColors } from '~/hooks/useThemeColors';
import { NewsStackParamList } from '~/navigations/types';
import { newsApiRequest } from '~/services/news';
import { NewsArticleDataType } from '~/store/news/types';
import { appThemeColors } from '~/styles/colors';
import { appFontFamily } from '~/styles/fonts';
import { isDataEmpty } from '~/utils/format';

export default function NewsListing() {
  const safeAreaInsets = useSafeAreaInsets();
  const [articles, setArticles] = useState<Array<NewsArticleDataType> | null>(
    null,
  );
  const { main } = useThemeColors();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<NewsStackParamList, 'NewsListing'>
    >();

  //    TODO: get news item data type
  const keyExtractor = useCallback((item: any, index: number) => {
    return `${item.id} ${index}`;
  }, []);

  const getEverythingQuery = useQuery({
      queryKey: ['news', 'everything'],
      queryFn: () => newsApiRequest.getEverything(),
    }),
    fallAssessmentsData = getEverythingQuery.data?.data;

  const onRefresh = () => {
    // Alert.alert('Refreshing assessment');
    getEverythingQuery.refetch;
  };

  //    TODO: get news item data type
  const renderListItem: ListRenderItem<any> = useCallback(({ item, index }) => {
    // @ts-ignore
    return <NewsItem news={item} index={index} />;
  }, []);

  //    TODO: get news item data type
  const renderListHeader = useCallback(() => {
    // @ts-ignore
    return (
      <View>
        <View style={styles.topWrapper}>
          <Text style={styles.topHeadlineTitle}>Top Headlines</Text>
          <NewsTopHeadlinesList />
        </View>
      </View>
    );
  }, []);

  console.log('articles', articles);

  useEffect(() => {
    if (getEverythingQuery.data) {
      setArticles(getEverythingQuery.data.data.articles);
    }
  }, [getEverythingQuery.data]);

  if (getEverythingQuery.isLoading && isDataEmpty(articles)) {
    return <CustomActivityIndicator />;
  }

  if (isDataEmpty(articles)) {
    return null;
  }

  return (
    <CustomScreenContainer isTopSafeArea={false}>
      <FlashList
        contentInsetAdjustmentBehavior="automatic"
        data={articles}
        renderItem={renderListItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
        estimatedItemSize={100}
        refreshControl={
          <CustomRefreshControl
            refreshing={getEverythingQuery.isRefetching}
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
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: 'transparent',
  },
  topWrapper: {},
  topHeadlineTitle: {
    fontFamily: appFontFamily.semiBold,
    fontSize: 18,
    color: appThemeColors.LIGHT.colorFromLogo.gray1,
    paddingHorizontal: 20,
  },
});
