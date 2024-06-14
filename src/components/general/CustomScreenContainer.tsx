import React, {PropsWithChildren} from 'react';
import {StatusBar, StyleSheet, ViewStyle} from 'react-native';
import {Edges, SafeAreaView} from 'react-native-safe-area-context';
import {useThemeColors, useThemeStore} from '~/hooks/useThemeColors';

interface Props extends PropsWithChildren {
  style?: ViewStyle;
  edges?: Edges;
  isTopSafeArea?: boolean;
  isBottomSafeArea?: boolean;
  isLeftSafeArea?: boolean;
  isRightSafeArea?: boolean;
}

export default function CustomScreenContainer({
  isBottomSafeArea = true,
  isLeftSafeArea = true,
  isRightSafeArea = true,
  isTopSafeArea = true,
  ...props
}: Props): React.JSX.Element {
  let edges: Edges = ['left', 'right'];
  edges = isTopSafeArea
    ? [...edges, 'top']
    : edges.filter(edge => edge !== 'top');
  edges = isBottomSafeArea
    ? [...edges, 'bottom']
    : edges.filter(edge => edge !== 'bottom');
  const {main} = useThemeColors();
  const themeStore = useThemeStore();

  return (
    <SafeAreaView
      style={[
        styles.container,
        props.style,
        {backgroundColor: main?.background},
      ]}
      edges={props.edges ?? edges}>
      <StatusBar
        barStyle={
          themeStore.mode === 'LIGHT' ? 'dark-content' : 'light-content'
        }
        backgroundColor={'transparent'}
        translucent={true}
      />
      <>{props.children}</>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F8F8F8",
  },
});
