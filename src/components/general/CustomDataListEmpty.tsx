import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '~/store';
import { appFontFamily } from '~/styles/fonts';
import CautionIndicator from '../svgs/CautionIndicator';

interface Props {
  title?: string;
  description?: string;
  icon?: React.JSX.Element;
}

function Componentt({
  title = 'No data',
  description = 'No data is available at the moment',
  ...props
}: Props): React.JSX.Element {
  const themeSelector = useAppSelector(state => state.theme);

  return (
    <View
      style={[
        styles.orderEmptyWrapper,
        { backgroundColor: themeSelector.colors.main.background },
      ]}
    >
      <View style={styles.orderEmptyIconWrapper}>
        {props.icon ? props.icon : <CautionIndicator />}
      </View>
      <View style={styles.bodyWrapper}>
        <Text
          style={[styles.title, { color: themeSelector.colors.text.primary }]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.description,
            { color: themeSelector.colors.text.secondary },
          ]}
        >
          {description}
        </Text>
      </View>
    </View>
  );
}

const CustomDataListEmpty = React.memo(Componentt);
export default CustomDataListEmpty;

const styles = StyleSheet.create({
  container: {},
  orderEmptyWrapper: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 24,
  },
  bodyWrapper: {
    rowGap: 8,
    alignItems: 'center',
  },
  title: {
    fontFamily: appFontFamily.semiBold,
    fontSize: 16,
    textTransform: 'capitalize',
  },
  description: {
    lineHeight: 25.69,
    textAlign: 'center',
  },
  orderEmptyIconWrapper: {
    height: 123,
    width: 123,
    borderRadius: 123,
    backgroundColor: '#CCCCCC50',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
