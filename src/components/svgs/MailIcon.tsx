import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props: any) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M17.8817 21.2656H7.91918C4.93043 21.2656 2.93793 19.7712 2.93793 16.2843L2.93793 9.31058C2.93793 5.82371 4.93043 4.32933 7.91918 4.32933H17.8817C20.8704 4.32933 22.8629 5.82371 22.8629 9.31058V16.2843C22.8629 19.7712 20.8704 21.2656 17.8817 21.2656Z"
        stroke="currentColor"
        stroke-width="1.49438"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M17.8819 9.80865L14.7637 12.2993C13.7375 13.1162 12.0539 13.1162 11.0277 12.2993L7.91943 9.80865"
        stroke="currentColor"
        stroke-width="1.49438"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

const MailIcon = React.memo(SvgComponent);
export default MailIcon;
