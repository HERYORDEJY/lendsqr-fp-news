import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';

interface Props extends FastImageProps {
  imageUri?: string;
}

export default function CustomFastImage(props: Props) {
  let imageSource = !props.source
    ? null
    : typeof props.source === 'number'
    ? props.source
    : { ...props.source, priority: FastImage.priority.normal };

  if (!Boolean(props.imageUri)) {
    return null;
  }

  return (
    <FastImage
      style={[props.style]}
      source={
        props.source ?? {
          uri: props.imageUri,
          headers: { Authorization: 'someAuthToken' },
          priority: FastImage.priority.normal,
        }
      }
      resizeMode={props.resizeMode ?? FastImage.resizeMode.cover}
    />
  );
}

const styles = StyleSheet.create({});
