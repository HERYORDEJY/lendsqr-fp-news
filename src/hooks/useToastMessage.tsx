// App.jsx
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { ToastOptions } from 'react-native-toast-message/lib/src/types';
import IconCheck from '~/components/svgs/CheckIcon';
import IconClose from '~/components/svgs/CloseIcon';
import IconError from '~/components/svgs/ErrorIcon';
import { ToastMessageType, ToastType } from '~/contextAPI/toast-message/types';
import { useAppSelector } from '~/store';
import { appThemeColors } from '~/styles/colors';
import { appFontFamily } from '~/styles/fonts';

const appLightThemeColors = appThemeColors.LIGHT;

function CustomToastMessageContainer({ props }: ToastOptions) {
  const windowDimension = useWindowDimensions();
  const themeSelector = useAppSelector(state => state.theme);

  const getTypeStyleProperties = (type: ToastType) => {
    switch (type) {
      case 'success': {
        return {
          iconWrapper: {
            backgroundColor: appLightThemeColors.white,
            borderColor: appLightThemeColors.grey900,
          },
          indicator: {
            backgroundColor: appLightThemeColors.grey200,
          },
        };
      }

      case 'error': {
        return {
          iconWrapper: {
            backgroundColor: appLightThemeColors.white,
            borderColor: appLightThemeColors.error,
          },
          indicator: {
            backgroundColor: appLightThemeColors.error,
          },
        };
      }

      default: {
        return {};
      }
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeSelector.colors.main.background,
          width: windowDimension.width - 16 * 2, // screen width minus the margin
        },
      ]}
    >
      <View
        style={[styles.indicator, getTypeStyleProperties(props.type).indicator]}
      />
      <View
        style={[
          styles.body,
          {
            borderColor: themeSelector.colors.main.background,
          },
        ]}
      >
        <View
          style={[
            styles.iconWrapper,
            getTypeStyleProperties(props.type).iconWrapper,
            { backgroundColor: themeSelector.colors.white },
          ]}
        >
          {props.icon}
        </View>

        <View style={[styles.messageWrapper]}>
          <Text style={{ lineHeight: 20.3, fontFamily: appFontFamily.medium }}>
            {props.title}
          </Text>
          <Text
            style={{
              lineHeight: 20,
              color: themeSelector.colors.text.secondary,
            }}
          >
            {props.message}
          </Text>
        </View>

        <Pressable
          onPress={() => Toast.hide()}
          style={[
            styles.closeButton,
            { borderColor: appLightThemeColors.grey25 },
          ]}
        >
          <IconClose color={themeSelector.colors.text.primary} />
        </Pressable>
      </View>
    </View>
  );
}

export const toastMessageConfig = {
  custom: (props: ToastMessageType) => {
    return <CustomToastMessageContainer {...props} />;
  },
};

export function useToastMessage() {
  const success = ({ title = 'Success', message = '', icon = <IconCheck /> }) =>
    Toast.show({
      type: 'custom',
      props: {
        message,
        title,
        icon,
        type: 'success',
      },
    });
  const error = ({ title = 'Oops!', message = '', icon = <IconError /> }) =>
    Toast.show({
      type: 'custom',
      props: {
        message,
        title,
        icon,
        type: 'error',
      },
    });

  const warning = ({ title = 'Oops!', message = '', icon = <IconError /> }) =>
    Toast.show({
      type: 'custom',
      props: {
        message,
        title,
        icon,
        type: 'warning',
      },
    });

  const info = ({ title = 'Oops!', message = '', icon = <IconError /> }) =>
    Toast.show({
      type: 'custom',
      props: {
        message,
        title,
        icon,
        type: 'info',
      },
    });

  const hide = () => Toast.hide();

  return { success, error, hide, warning, info };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  indicator: {
    width: 6,
    height: '100%',
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    // min: 86,
  },
  body: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 1,
    // height: 86,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderLeftWidth: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    columnGap: 12,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
  },
  messageWrapper: {
    flex: 1,
    flexDirection: 'column',
    rowGap: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    columnGap: 4,
    width: '100%',
    height: '100%',
  },
  closeButton: {
    paddingLeft: 12,
    borderLeftWidth: 1,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
});
