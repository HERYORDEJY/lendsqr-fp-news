import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useThemeColors } from '~/hooks/useThemeColors';
import { useAppSelector } from '~/store';

interface Props extends ViewProps {
  //
  backgroundColor?: string;
}

export default function SectionDivider(props: Props) {
  const themeSelector = useAppSelector(state => state.theme);
  const { divider } = useThemeColors();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: props.backgroundColor ?? divider },
        props.style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: 1,
    flex: 1,
  },
});

// const l = {
//     sectionDivider: '#EAEAEA',
//   },
//   d = {
//     sectionDivider: '#98A2B3',
//   };
