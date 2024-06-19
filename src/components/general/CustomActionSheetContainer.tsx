import React, { PropsWithChildren, RefObject } from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IconClose from '~/components/svgs/CloseIcon';
import { useThemeColors } from '~/hooks/useThemeColors';
import { appFontFamily } from '~/styles/fonts';

interface Props extends PropsWithChildren {
  onClose?: () => void;
  title?: string;
  containerStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  style?: ViewStyle;
  sheetRef: RefObject<ActionSheetRef>;
}

export default function CustomActionSheetContainer(
  props: Props,
): React.JSX.Element {
  const { section } = useThemeColors();
  const safeAreInsets = useSafeAreaInsets();

  const onClose = () => {
    props.onClose?.();
    props.sheetRef?.current?.hide();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: section?.container.background,
          paddingBottom: safeAreInsets.bottom,
        },
        props.style,
      ]}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: section?.header.background },
          props.headerStyle,
        ]}
      >
        <Text
          style={[styles.headerTitle, { color: section?.header.titleColor }]}
        >
          {props.title}
        </Text>

        <Pressable style={styles.closeButton} onPress={onClose}>
          <IconClose />
        </Pressable>
      </View>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    maxHeight: Dimensions.get('screen').height * 0.9,
    minHeight: Dimensions.get('screen').height * 0.3,
    flex: 0,
  },
  header: {
    height: 64,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 16,
    alignItems: 'center',
  },
  headerTitle: {
    letterSpacing: 1.12,
    fontFamily: appFontFamily.semiBold,
    fontSize: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {},
  formContainer: { rowGap: 24, width: '100%', marginBottom: 40 },
});
