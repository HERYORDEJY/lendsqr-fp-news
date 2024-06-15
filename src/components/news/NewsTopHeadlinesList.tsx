import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { newsApiRequest } from '~/services/news';
import { NewsArticleDataType } from '~/store/news/types';
import { isDataEmpty } from '~/utils/format';
import CustomRefreshControl from '../general/CustomRefreshControl';
import NewsTopHeadlineItem from './NewsTopHeadlineItem';

export default function NewsTopHeadlinesList() {
  const [articles, setArticles] = useState<Array<NewsArticleDataType> | null>(
    null,
  );

  const keyExtractor = useCallback(
    (item: NewsArticleDataType, index: number) => {
      return `${item.title} ${item.url} ${index}`;
    },
    [],
  );

  const getTopHeadlinesQuery = useQuery({
      queryKey: ['news', 'top-headlines'],
      queryFn: () => newsApiRequest.getTopHeadlines(),
    }),
    fallAssessmentsData = getTopHeadlinesQuery.data?.data;

  const onRefresh = () => {
    // Alert.alert('Refreshing assessment');
    getTopHeadlinesQuery.refetch;
  };

  //    TODO: get news item data type
  const renderListItem: ListRenderItem<NewsArticleDataType> = useCallback(
    ({ item, index }) => {
      // @ts-ignore
      return <NewsTopHeadlineItem news={item} index={index} />;
    },
    [],
  );

  useEffect(() => {
    if (getTopHeadlinesQuery.data?.data) {
      setArticles(getTopHeadlinesQuery.data.data.articles);
    }
  }, [getTopHeadlinesQuery.data]);

  //   if (getTopHeadlinesQuery.isLoading && isDataEmpty(articles)) {
  //     return <CustomActivityIndicator />;
  //   }

  if (isDataEmpty(articles)) {
    return null;
  }

  return (
    <>
      <FlashList
        contentInsetAdjustmentBehavior="automatic"
        horizontal={true}
        data={articles}
        renderItem={renderListItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
        estimatedItemSize={100}
        refreshControl={
          <CustomRefreshControl
            refreshing={getTopHeadlinesQuery.isRefetching}
            onRefresh={onRefresh}
          />
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
  },
});
