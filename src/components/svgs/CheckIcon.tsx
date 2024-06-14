import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      // @ts-ignore
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <Path
        stroke="#006D33"
        strokeWidth={1.8}
        d="m6 12.75 3.044 3.044a.15.15 0 0 0 .212 0L16.8 8.25"
      />
    </Svg>
  );
}

const IconCheck = React.memo(SvgComponent);
export default IconCheck;
