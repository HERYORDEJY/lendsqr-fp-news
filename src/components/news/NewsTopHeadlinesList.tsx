import { FlashList, ListRenderItem } from '@shopify/flash-list';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useToastMessage } from '~/hooks/useToastMessage';
import { newsApiRequest } from '~/services/news';
import { useAppDispatch, useAppSelector } from '~/store';
import { setTopHeadlineNewsAction } from '~/store/news/slice';
import { NewsArticleDataType } from '~/store/news/types';
import { isDataEmpty } from '~/utils/format';
import NewsTopHeadlineItem from './NewsTopHeadlineItem';

interface Props {
  initiateReload?: boolean;
}

export default function NewsTopHeadlinesList(props: Props) {
  const newsStore = useAppSelector(state => state.news);
  const appDispatch = useAppDispatch();
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [isRefreshingNews, setIsRefreshingNews] = useState(false);
  const toastMessage = useToastMessage();

  const keyExtractor = useCallback(
    (item: NewsArticleDataType, index: number) => {
      return `${item.title} ${item.url} ${index}`;
    },
    [],
  );

  const getTopHeadlineNews = async () => {
    try {
      const res = await newsApiRequest.getTopHeadlines();
      return res.data;
    } catch (error: any) {
      toastMessage.error({ message: error.message });
    }
  };

  const onRefresh = () => {
    // Alert.alert('Refreshing assessment');
    getTopHeadlineNews();
  };

  const renderListItem: ListRenderItem<NewsArticleDataType> = useCallback(
    ({ item, index }) => {
      // @ts-ignore
      return <NewsTopHeadlineItem news={item} index={index} />;
    },
    [],
  );

  useEffect(() => {
    getTopHeadlineNews().then(data => {
      if (data.articles) {
        appDispatch(setTopHeadlineNewsAction(data.articles));
        setIsLoadingNews(false);
      }
    });
  }, [props.initiateReload]);

  if (!isLoadingNews && isDataEmpty(newsStore.topHeadlines)) {
    return null;
  }

  return (
    <>
      <FlashList
        contentInsetAdjustmentBehavior="automatic"
        horizontal={true}
        data={newsStore.topHeadlines}
        renderItem={renderListItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
        estimatedItemSize={100}
      />
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    // paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
  },
});
