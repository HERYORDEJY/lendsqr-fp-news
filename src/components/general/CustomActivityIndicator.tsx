import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useAppSelector} from '~/store';

interface Props extends ActivityIndicatorProps {
  isLoading?: boolean;
  title?: string;
  description?: string;
}
export default function CustomActivityIndicator({
  isLoading = true,
  size = 'large',
  ...props
}: Props) {
  const themeSelector = useAppSelector(state => state.theme);
  // const nudgeColor = themeSelector.colors.screenBackground;
  return (
    <>
      {isLoading ? (
        <View style={[styles.container, props.style]}>
          <ActivityIndicator
            size={size}
            color={props.color ?? themeSelector.colors.activityIndicator}
          />
          {props.title || props.description ? (
            <View style={styles.bodyWrapper}>
              {props.title ? (
                <Text
                  style={[
                    styles.title,
                    {color: themeSelector.colors.textPrimary},
                  ]}>
                  {props.title}
                </Text>
              ) : null}
              {props.description ? (
                <Text
                  style={[
                    styles.description,
                    {color: themeSelector.colors.textSecondary},
                  ]}>
                  {props.description}
                </Text>
              ) : null}
            </View>
          ) : null}
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 10,
  },
  bodyWrapper: {
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
});
