import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      //@ts-ignore
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      {...props}
    >
      <G clipPath="url(#a)">
        <Path
          fill="#DB371F"
          d="M10 20c5.523 0 10-4.477 10-10 0-5.522-4.477-10-10-10C4.478 0 0 4.478 0 10c0 5.523 4.478 10 10 10Zm1.25-8.75a1.25 1.25 0 0 1-2.5 0V5a1.25 1.25 0 0 1 2.5 0v6.25ZM10 13.73a1.25 1.25 0 1 1 0 2.499 1.25 1.25 0 0 1 0-2.499Z"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h20v20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

const IconError = React.memo(SvgComponent);
export default IconError;
