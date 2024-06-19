import * as React from 'react';
import { memo } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    //   @ts-ignore
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={30}
    height={30}
    baseProfile="full"
    viewBox="0 0 76 76"
    {...props}
  >
    <Path
      fill="#A90028"
      d="m12.25 36.88 24.63-24.63a1.583 1.583 0 0 1 2.24 0l24.63 24.63c.619.619.619 1.621 0 2.24L39.12 63.75a1.583 1.583 0 0 1-2.24 0L12.25 39.12a1.583 1.583 0 0 1 0-2.24ZM38 45.125a3.563 3.563 0 1 0 0 7.125 3.563 3.563 0 0 0 0-7.125ZM34.437 23.75l1.188 19h4.75l1.188-19h-7.126Z"
    />
  </Svg>
);
const CrashIcon = memo(SvgComponent);
export default CrashIcon;
