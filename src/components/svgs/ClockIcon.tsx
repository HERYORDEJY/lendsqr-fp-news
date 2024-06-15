import * as React from 'react';
import { memo } from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    //   @ts-ignore
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={10}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <G stroke="#1C274C" strokeWidth={1.5}>
      <Path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2.5 2.5" />
      <Path
        d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"
        opacity={0.5}
      />
    </G>
  </Svg>
);
const ClockIcon = memo(SvgComponent);
export default ClockIcon;
