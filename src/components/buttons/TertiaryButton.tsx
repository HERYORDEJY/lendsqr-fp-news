import React, { memo } from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { useThemeStore } from '~/hooks/useThemeColors';
import { lightThemeColors } from '~/styles/colors';
import { appFontFamily } from '~/styles/fonts';
import CustomActivityIndicator from '../general/CustomActivityIndicator';

interface Props extends TouchableOpacityProps {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  animating?: boolean;
  leftIcon?: any;
  isLoading?: boolean;
  containerStyle?: ViewStyle;
}

const TertiaryButton = memo((props: Props) => {
  const isLoading = props.isLoading || props.animating;
  const isDisabled = props.disabled || isLoading;
  const themeStore = useThemeStore();

  return (
    <TouchableOpacity
      style={[styles.container, props.containerStyle]}
      activeOpacity={0.75}
      {...props}
      disabled={isDisabled}
    >
      {isLoading ? (
        <CustomActivityIndicator
          isLoading={isLoading}
          color={themeStore.colors.grey600}
          size="small"
        />
      ) : props.children ? (
        props.children
      ) : (
        <>
          {props?.leftIcon && <View>{props?.leftIcon}</View>}
          <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
});

export default TertiaryButton;

const styles = StyleSheet.create({
  container: {
    height: 48,
    columnGap: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 8,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  title: {
    fontFamily: appFontFamily.semiBold,
    fontSize: 16,
    color: lightThemeColors.primary,
  },
});
