import React, { useMemo, useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { useAppSelector } from '~/store';
import { appFontFamily } from '~/styles/fonts';
import EyeIcon from '../svgs/EyeIcon';
import EyeSlashIcon from '../svgs/EyeSlashIcon';
import LockIcon from '../svgs/LockIcon';

interface Props extends TextInputProps {
  errorMessage?: string | undefined | null;
  infoText?: string | undefined | null;
  label?: string;
  inputStyles?: TextInputProps['style'];
  containerStyles?: ViewStyle;
  wrapperStyles?: ViewStyle;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
}

export default function PasswordInput(props: Props) {
  const inputRef = useRef<TextInput>(null);
  const themeSelector = useAppSelector(state => state.theme),
    inputThemeColors =
      props.editable !== false
        ? themeSelector.colors.input
        : themeSelector.colors.input_disabled;
  const [isFocused, setIsFocused] = useState(false);
  const isError = Boolean(props.errorMessage);
  const isInfoText = Boolean(props.infoText);
  const [isSecureEntryText, setIsSecureEntryText] = useState(true);
  const [value, setValue] = useState(props.value ?? '');
  const isSuccess = Boolean(value) && !isError && !isFocused;

  const outlineStateColor = useMemo(() => {
    switch (true) {
      case isError:
        return inputThemeColors.errorColor;
      case isFocused:
        return inputThemeColors.infoColor;
      case isSuccess:
        return inputThemeColors.successColor;
      default:
        return inputThemeColors.borderColor;
    }
  }, [isFocused, value, isError]);

  const toggleIsSecureEntryText = () =>
    setIsSecureEntryText(isSecureEntryText => !isSecureEntryText);

  const onChangeText = (text: string) => {
    setValue(text);
    props.onChangeText?.(text);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  return (
    <View style={styles.container}>
      <Text
        onPress={() => inputRef?.current?.focus()}
        style={[
          styles.label,
          {
            color: isError
              ? inputThemeColors.errorColor
              : inputThemeColors.labelColor,
          },
          ,
        ]}
      >
        {props.label ?? 'Password'}
      </Text>
      <View
        style={[
          styles.wrapper,
          {
            borderColor: outlineStateColor,
            backgroundColor: inputThemeColors.backgroundColor,
          },
          ,
        ]}
      >
        <View style={styles.leftElement}>
          <LockIcon color={inputThemeColors.iconColor} />
        </View>

        <TextInput
          autoCorrect={false}
          autoCapitalize={'none'}
          autoComplete={'off'}
          {...props}
          ref={inputRef}
          cursorColor={inputThemeColors.cursorColor}
          placeholder={props.placeholder ?? 'Enter your password'}
          style={[styles.textinput, { color: inputThemeColors.textColor }]}
          placeholderTextColor={inputThemeColors.placeholderColor}
          secureTextEntry={isSecureEntryText}
          onChangeText={onChangeText}
        />
        <Pressable
          onPress={toggleIsSecureEntryText}
          style={styles.rightElement}
        >
          {!isSecureEntryText ? (
            <EyeSlashIcon color={inputThemeColors.iconColor} />
          ) : (
            <EyeIcon color={inputThemeColors.iconColor} />
          )}
        </Pressable>
      </View>

      {isInfoText || isError ? (
        <View style={[styles.bottom]}>
          {isError ? (
            <Text
              style={[
                styles.errorMessage,
                {
                  color: inputThemeColors.errorColor,
                },
              ]}
            >
              {props.errorMessage}*
            </Text>
          ) : null}
          {isInfoText ? (
            <Text
              style={[
                styles.infoText,
                {
                  color: inputThemeColors.infoColor,
                },
              ]}
            >
              {props.infoText}
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 4,
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    // justifyContent: "center",
    alignItems: 'center',
    columnGap: 4,
    paddingHorizontal: 8,
  },
  label: { fontSize: 16, paddingLeft: 12, fontFamily: appFontFamily.medium },
  textinput: {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
  },
  leftElement: {},
  rightElement: {},
  errorMessage: {
    fontSize: 12,
    lineHeight: 20.3,
  },
  infoText: {
    fontSize: 12,
    lineHeight: 20.3,
  },
  bottom: {
    rowGap: 4,
  },
});
