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
import { useThemeColors } from '~/hooks/useThemeColors';
import CustomActivityIndicator from '../general/CustomActivityIndicator';

interface Props extends TouchableOpacityProps {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  animating?: boolean;
  leftIcon?: any;
  isLoading?: boolean;
  containerStyle?: ViewStyle;
}

const SecondaryButton = memo((props: Props) => {
  const isLoading = props.isLoading || props.animating;
  const isDisabled = props.disabled || isLoading;
  const { button, colors, button_disabled } = useThemeColors();
  const buttonColor = isDisabled ? button_disabled : button;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor: buttonColor.primary.background,
          backgroundColor: 'transparent',
        },
        props.containerStyle,
      ]}
      activeOpacity={0.75}
      {...props}
      disabled={isDisabled}
    >
      {isLoading ? (
        <CustomActivityIndicator
          isLoading={isLoading}
          color="white"
          size="small"
        />
      ) : props.children ? (
        props.children
      ) : (
        <>
          {props?.leftIcon && <View>{props?.leftIcon}</View>}
          <Text
            style={[styles.title, { color: buttonColor.primary.background }]}
          >
            {props.title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
});

export default SecondaryButton;

const styles = StyleSheet.create({
  container: {
    height: 48,
    columnGap: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 8,
    flexDirection: 'row',

    borderWidth: 1,
  },
  title: {
    fontFamily: 'montserratMedium',
    fontSize: 16,
  },
});
