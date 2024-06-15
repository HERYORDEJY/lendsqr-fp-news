import { formatDistanceToNowStrict } from 'date-fns';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  useWindowDimensions,
  View,
} from 'react-native';
import { useThemeColors } from '~/hooks/useThemeColors';
import { NewsArticleDataType } from '~/store/news/types';
import { appThemeColors } from '~/styles/colors';
import { appFontFamily } from '~/styles/fonts';
import CustomFastImage from '../general/CustomFastImage';
import ClockIcon from '../svgs/ClockIcon';

interface Props extends TouchableOpacityProps {
  news: NewsArticleDataType; //    TODO: get news item data type
  index: number;
}

const Component = ({ news, ...props }: Props) => {
  const windowDimensions = useWindowDimensions();
  const { card, text } = useThemeColors();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: windowDimensions.width * 0.6,
          backgroundColor: card.background,
        },
      ]}
    >
      <View
        style={[
          styles.imageWrapper,
          {
            height: windowDimensions.width * 0.4,
          },
        ]}
      >
        <CustomFastImage imageUri={news.urlToImage} style={styles.image} />
      </View>
      <View style={styles.descWrapper}>
        <View style={styles.sourceWrapper}>
          <Text style={styles.source}>{news.source.name}</Text>

          <View style={[styles.sourceWrapper, { columnGap: 4 }]}>
            <ClockIcon width={10} height={10} />
            <Text style={[styles.date, { color: text.secondary }]}>
              {formatDistanceToNowStrict(new Date(news.publishedAt), {
                addSuffix: true,
              })}
            </Text>
          </View>
        </View>
        <Text style={styles.title}>{news.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const NewsTopHeadlineItem = Component; // React.memo(Component);
export default NewsTopHeadlineItem;

const styles = StyleSheet.create({
  container: { marginRight: 20 },
  imageWrapper: { width: '100%', overflow: 'hidden' },
  image: { aspectRatio: 1 },
  descWrapper: {
    padding: 10,
    paddingVertical: 5,
    rowGap: 5,
  },
  title: {
    fontFamily: appFontFamily.medium,
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
});
