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
        fill: "#ff3939",
      }}
    />
    <Path
      d="M24 10.1 21.9 8 16 13.9 10.1 8 8 10.1l5.9 5.9L8 21.9l2.1 2.1 5.9-5.9 5.9 5.9 2.1-2.1-5.9-5.9z"
      //@ts-ignore
      style={{
        fill: "#e6e6e6",
      }}
    />
  </Svg>
);

const ErrorIndicator = memo(SvgComponent);
export default ErrorIndicator;
