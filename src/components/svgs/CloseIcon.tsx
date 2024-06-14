import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
  isBigIcon?: boolean;
}

function SvgComponent({ isBigIcon = false, ...props }: Props) {
  return isBigIcon ? (
    <Svg
      // @ts-ignore
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={17}
      fill="none"
      {...props}
    >
      <Path
        stroke={props.color ?? "#292D32"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m1 1 14.142 14.142M1 15.142 15.142 1"
      />
    </Svg>
  ) : (
    <Svg
      // @ts-ignore
      xmlns="http://www.w3.org/2000/svg"
      width={34}
      height={34}
      fill="none"
      {...props}
    >
      <Path
        stroke={props.color ?? "#292D32"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.667}
        d="m12.757 12.757 8.486 8.486M12.757 21.243l8.486-8.486"
      />
    </Svg>
  );
}

const IconClose = React.memo(SvgComponent);
export default IconClose;
