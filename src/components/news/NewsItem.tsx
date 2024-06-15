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

interface Props extends TouchableOpacityProps {
  news: NewsArticleDataType; //    TODO: get news item data type
  index: number;
}

const Component = ({ news, ...props }: Props) => {
  const windowDimensions = useWindowDimensions();
  const { card, text } = useThemeColors();
  return (
    <TouchableOpacity style={styles.container}>
      <View
        style={[
          styles.imageWrapper,
          {
            height: windowDimensions.width * 0.15,
            width: windowDimensions.width * 0.25,
          },
        ]}
      >
        <CustomFastImage imageUri={news.urlToImage} style={styles.image} />
      </View>
      <View>
        <Text>NewsItem</Text>
      </View>
    </TouchableOpacity>
  );
};

const NewsItem = Component; // React.memo(Component);
export default NewsItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
  },
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
