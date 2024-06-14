import * as React from "react";
import { memo } from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  outerFill?: string;
  innerFill?: string;
}

const SvgComponent = (props: Props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={32}
    height={32}
    style={{
      overflow: "visible",
      //@ts-ignore
      enableBackground: "new 0 0 32 32",
    }}
    {...props}
  >
    <Circle
      cx={16}
      cy={16}
      r={16}
      //@ts-ignore
      style={{
        fill: "#19d873",
      }}
    />
    <Path
      d="M14 17.9 10.1 14 8 16.1l6 6 10-10-2.1-2.1z"
      //@ts-ignore
      style={{
        fill: "#e6e6e6",
      }}
    />
  </Svg>
);

const SuccessIndicator = memo(SvgComponent);
export default SuccessIndicator;
