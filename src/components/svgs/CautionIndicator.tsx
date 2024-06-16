import * as React from "react";
import { memo } from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

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
    <Path
      d="M27.3 4.7c-6.2-6.2-16.4-6.2-22.6 0-6.2 6.2-6.2 16.4 0 22.6 6.2 6.2 16.4 6.2 22.6 0 6.3-6.2 6.3-16.4 0-22.6zm-2.8 2.8c4.2 4.2 4.6 10.7 1.3 15.4L9.1 6.2c4.6-3.3 11.2-2.9 15.4 1.3zm-17 17C3.3 20.3 2.9 13.7 6.2 9.1l16.7 16.7c-4.6 3.3-11.2 2.9-15.4-1.3z"
      //@ts-ignore
      style={{
        fill: props.outerFill ?? "#ff3939",
      }}
    />
  </Svg>
);

const CautionIndicator = memo(SvgComponent);
export default CautionIndicator;
