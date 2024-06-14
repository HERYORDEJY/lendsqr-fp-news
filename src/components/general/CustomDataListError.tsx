import React from 'react';
import {
  RefreshControlProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useAppSelector} from '~/store';
import ErrorIndicator from '../svgs/ErrorIndicator';
import CustomActivityIndicator from './CustomActivityIndicator';

interface Props {
  title?: string;
  description?: string;
  icon?: React.JSX.Element;
  refreshControl: RefreshControlProps;
  actionText?: string;
}

function Componentt({
  title = 'Something went wrong',
  actionText = 'Unable to fetch data. Please try again',
  refreshControl: {onRefresh, refreshing},
  ...props
}: Props): React.JSX.Element {
  const themeSelector = useAppSelector(state => state.theme);

  return (
    <View style={[styles.orderEmptyWrapper]}>
      <View style={styles.orderEmptyIconWrapper}>
        {refreshing ? (
          <CustomActivityIndicator isLoading={refreshing} />
        ) : props.icon ? (
          props.icon
        ) : (
          <ErrorIndicator />
        )}
      </View>
      <View style={styles.welcomeWrapper}>
        <Text style={[styles.title, {color: themeSelector.colors.textPrimary}]}>
          {title}
        </Text>

        {props.description ? (
          <Text
            style={[
              styles.description,
              {color: themeSelector.colors.textSecondary},
            ]}>
            {props.description}
          </Text>
        ) : null}
        <TouchableOpacity onPress={onRefresh}>
          <Text
            style={[
              styles.description,
              {
                color: themeSelector.colors.textSecondary,
                textDecorationColor: themeSelector.colors.textSecondary,
                textDecorationLine: 'underline',
              },
            ]}>
            {actionText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const CustomDataListError = React.memo(Componentt);
export default CustomDataListError;

const styles = StyleSheet.create({
  container: {
    //
  },
  orderEmptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 24,
  },
  welcomeWrapper: {
    rowGap: 8,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'montserratSemibold',
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
