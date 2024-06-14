import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { useThemeColors } from '~/hooks/useThemeColors';
import { appFontFamily } from '~/styles/fonts';

interface Props extends ViewProps {
  title: string;
  description?: string;
}

export default function AuthScreenHeader(props: Props) {
  const { text } = useThemeColors();
  return (
    <View style={[styles.pageHeader]}>
      <Text style={[styles.pageHeaderTitle, { color: text?.primary }]}>
        {props.title}
      </Text>
      {props.description ? (
        <Text style={[styles.pageHeaderSubtitle, { color: text?.secondary }]}>
          {props.description}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  pageHeader: {
    marginBottom: 16,
  },
  pageHeaderTitle: {
    fontSize: 40,
    fontFamily: appFontFamily.bold,
    textAlign: 'center',
    marginBottom: 7,
  },
  pageHeaderSubtitle: {
    // fontSize: 40,
    // fontFamily:  'montserratBold',
    textAlign: 'center',
  },
});
