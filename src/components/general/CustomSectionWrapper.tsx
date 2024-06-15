import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useThemeColors } from '~/hooks/useThemeColors';
import { useAppSelector } from '~/store';
import { appFontFamily } from '~/styles/fonts';
import SectionDivider from './SectionDivider';

interface Props extends PropsWithChildren {
  //
  title?: string;
  contentStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  headerStyle?: ViewStyle;
}

export default function CustomSectionWrapper(props: Props): React.JSX.Element {
  const themeSelector = useAppSelector(state => state.theme);
  const { section } = useThemeColors();
  return (
    <View style={[styles.container, props.containerStyle]}>
      {Boolean(props.title?.trim()) ? (
        <View
          style={[
            styles.header,
            props.headerStyle,
            { backgroundColor: section?.header.background },
          ]}
        >
          <SectionDivider />
          <Text
            style={[styles.headerTitle, { color: section?.header.titleColor }]}
          >
            {props.title}
          </Text>
          <SectionDivider />
        </View>
      ) : null}

      <View
        style={[
          styles.content,
          props.contentStyle,
          {
            backgroundColor: section?.container.background,
            borderColor: section?.container.border,
          },
        ]}
      >
        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
  },

  content: {
    padding: 16,

    borderWidth: 1,
    borderRadius: 8,
    rowGap: 20,
  },

  headerTitle: {
    // fontSize: 12,
    fontFamily: appFontFamily.medium,
    lineHeight: 18.38,
    textTransform: 'uppercase',
  },
});
