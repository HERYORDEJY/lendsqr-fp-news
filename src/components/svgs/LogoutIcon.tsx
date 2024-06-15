import * as React from "react";
import { memo } from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg
    //   @ts-ignore
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="#DB371F"
    viewBox="0 0 24 24"
    {...props}
  >
    <G stroke="#DB371F" strokeLinecap="round" strokeWidth={1.5}>
      <Path strokeLinejoin="round" d="M10 12h10m0 0-3-3m3 3-3 3" />
      <Path d="M4 12a8 8 0 0 1 8-8m0 16a7.985 7.985 0 0 1-6.245-3" />
    </G>
  </Svg>
);
const LogoutIcon = memo(SvgComponent);
export default LogoutIcon;
