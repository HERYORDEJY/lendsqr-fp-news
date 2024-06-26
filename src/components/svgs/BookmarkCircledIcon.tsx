import * as React from 'react';
import { memo } from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    //   @ts-ignore
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ?? 24}
    height={props.height ?? 24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <G stroke={props.color ?? '#1C274D'} strokeWidth={1.5}>
      <Path d="M16 14.046v-2.497c0-2.145 0-3.217-.586-3.883C14.828 7 13.886 7 12 7c-1.886 0-2.828 0-3.414.666C8 8.332 8 9.404 8 11.55v2.497c0 1.548 0 2.322.326 2.66a.95.95 0 0 0 .562.29c.438.056.95-.453 1.975-1.473.453-.45.68-.676.942-.736a.883.883 0 0 1 .39 0c.262.06.489.285.942.736 1.024 1.02 1.537 1.53 1.976 1.473a.95.95 0 0 0 .56-.29c.327-.338.327-1.112.327-2.66Z" />
      <Path
        strokeLinecap="round"
        d="M7 3.338A9.954 9.954 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5"
      />
    </G>
  </Svg>
);
const BookmarkCircledIcon = memo(SvgComponent);
export default BookmarkCircledIcon;
