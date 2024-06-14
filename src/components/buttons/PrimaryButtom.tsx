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
import { appThemeColors } from '~/styles/colors';
import { appFontFamily } from '~/styles/fonts';
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

const PrimaryButton = memo((props: Props) => {
  const isLoading = props.isLoading || props.animating;
  const isDisabled = props.disabled || isLoading;
  const { button, button_disabled } = useThemeColors();

  const buttonColor = isDisabled ? button_disabled : button;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: buttonColor.primary.background,
          opacity: isDisabled ? 0.5 : 1,
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
          {props?.leftIcon ? <View>{props?.leftIcon}</View> : null}
          <Text style={[styles.title]}>{props.title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
});

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    height: 48,
    columnGap: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 8,
    flexDirection: 'row',
    backgroundColor: appThemeColors.LIGHT.colorFromLogo.red,
  },
  title: {
    fontFamily: appFontFamily.semiBold,
    fontSize: 16,
    color: '#fff',
  },
});
