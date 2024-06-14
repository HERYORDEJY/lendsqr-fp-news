import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  const strokeColor = props.stroke ?? "#1C1C1C";
  return (
    <Svg
      // xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <Path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M9.57 5.93 3.5 12l6.07 6.07"
      />
    </Svg>
  );
}

const ChevronRightIcon = React.memo(SvgComponent);
export default ChevronRightIcon;
