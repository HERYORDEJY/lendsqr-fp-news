import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { formatDistanceToNowStrict } from 'date-fns';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { useThemeColors } from '~/hooks/useThemeColors';
import { NewsStackParamList } from '~/navigations/types';
import { NewsArticleDataType } from '~/store/news/types';
import { appThemeColors } from '~/styles/colors';
import { appFontFamily } from '~/styles/fonts';
import CustomFastImage from '../general/CustomFastImage';
import ClockIcon from '../svgs/ClockIcon';
import NewsAuthorIcon from '../svgs/NewsAuthorIcon';

interface Props extends TouchableOpacityProps {
  news: NewsArticleDataType;
  index: number;
  // containerStyles: TouchableOpacityProps['style'];
}

const Component = ({ news, ...props }: Props) => {
  const { card, text } = useThemeColors();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<NewsStackParamList, 'NewsListing'>
    >();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: card.background },
        props.style,
      ]}
      onPress={() =>
        navigation.navigate('NewsDetails', { news: JSON.stringify(news) })
      }
    >
      <View
        style={[
          styles.imageWrapper,
          {
            flex: 0.4,
          },
        ]}
      >
        <CustomFastImage imageUri={news.urlToImage} style={styles.image} />
      </View>

      <View style={styles.descWrapper}>
        <View style={styles.sourceWrapper}>
          <Text style={styles.source}>{news.source.name}</Text>

          <View style={[styles.sourceWrapper, { columnGap: 4 }]}>
            <ClockIcon width={10} height={10} color={'#007AFF'} />
            <Text style={[styles.date, { color: text.secondary }]}>
              {formatDistanceToNowStrict(new Date(news.publishedAt), {
                addSuffix: true,
              })}
            </Text>
          </View>
        </View>
        {/* <View style={[styles.titleWrapper]}> */}
        <Text style={styles.title} numberOfLines={3}>
          {news.title}
        </Text>
        <View
          style={[
            styles.sourceWrapper,
            { columnGap: 4, justifyContent: 'flex-start' },
          ]}
        >
          <NewsAuthorIcon color={'#007AFF'} />
          <Text
            style={[styles.author, { color: text.secondary }]}
            numberOfLines={1}
          >
            {news.author}
          </Text>
        </View>
        {/* </View> */}
      </View>
    </TouchableOpacity>
  );
};

const NewsItem = React.memo(Component);
export default NewsItem;

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    height: 110,
    flex: 1,
  },
  imageWrapper: { width: '100%', overflow: 'hidden' },
  image: { flex: 1 },
  descWrapper: {
    padding: 10,
    paddingVertical: 5,
    rowGap: 10,
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
  },
  titleWrapper: {
    justifyContent: 'space-between',
    rowGap: 16,
    flex: 1,
  },
  title: {
    fontFamily: appFontFamily.medium,
    // flex: 1,
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
  author: {
    fontFamily: appFontFamily.medium,
    fontSize: 10,
    // flex: 1,
  },
  sourceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
