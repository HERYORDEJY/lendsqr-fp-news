import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import CustomActivityIndicator from '~/components/general/CustomActivityIndicator';
import CustomScreenContainer from '~/components/general/CustomScreenContainer';
import { useThemeColors } from '~/hooks/useThemeColors';
import { NewsStackParamList } from '~/navigations/types';
import { NewsArticleDataType } from '~/store/news/types';
import { appThemeColors } from '~/styles/colors';
import { appFontFamily } from '~/styles/fonts';

export default function NewsDetails() {
  const navigation =
    useNavigation<NavigationProp<NewsStackParamList, 'NewsDetails'>>();
  const route = useRoute<RouteProp<NewsStackParamList, 'NewsDetails'>>();
  const news: NewsArticleDataType = JSON.parse(route.params.news);
  const { main } = useThemeColors();
  const [isLoadingWeb, setIsLoadingWeb] = useState(true);

  useEffect(() => {
    navigation.setParams({
      isLoadingWebpage: isLoadingWeb,
    });
  }, [isLoadingWeb]);

  return (
    <CustomScreenContainer isTopSafeArea={false}>
      <WebView
        source={{ uri: news.url }}
        style={{ flex: 1 }}
        startInLoadingState={true}
        renderLoading={() => (
          <>
            <CustomActivityIndicator
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                backgroundColor: main.background,
              }}
            />
          </>
        )}
        onLoadEnd={() => {
          setIsLoadingWeb(false);
        }}
      />
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
  wrapper: {
    rowGap: 8,
  },
  imageWrapper: { width: '100%', overflow: 'hidden' },
  image: { flex: 1, width: undefined, height: undefined },
  descWrapper: {
    padding: 10,
    paddingVertical: 5,
    rowGap: 5,
  },
  title: {
    fontFamily: appFontFamily.semiBold,
    fontSize: 18,
  },
  source: {
    fontFamily: appFontFamily.medium,
    fontSize: 10,
    color: appThemeColors.LIGHT.colorFromLogo.red,
  },
  date: {
    fontFamily: appFontFamily.medium,
    fontSize: 10,
  },
  sourceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  author: {
    fontFamily: appFontFamily.medium,
    fontSize: 10,
    // flex: 1,
  },
  content: {},
});
