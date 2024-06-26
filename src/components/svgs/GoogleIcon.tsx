import * as React from 'react';
import { memo } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    //   @ts-ignore
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path fill="#fff" d="M.846 0h24v24h-24z" />
    <Path
      fill="#4285F4"
      fillRule="evenodd"
      d="M23.886 12.261c0-.815-.073-1.6-.21-2.352h-10.83v4.448h6.189a5.29 5.29 0 0 1-2.295 3.471v2.886h3.717c2.174-2.002 3.429-4.95 3.429-8.453Z"
      clipRule="evenodd"
    />
    <Path
      fill="#34A853"
      fillRule="evenodd"
      d="M12.846 23.5c3.105 0 5.708-1.03 7.61-2.786l-3.716-2.886c-1.03.69-2.347 1.098-3.894 1.098-2.995 0-5.53-2.023-6.435-4.741H2.57v2.98A11.496 11.496 0 0 0 12.846 23.5Z"
      clipRule="evenodd"
    />
    <Path
      fill="#FBBC05"
      fillRule="evenodd"
      d="M6.411 14.185A6.913 6.913 0 0 1 6.051 12c0-.758.13-1.495.36-2.185v-2.98H2.57A11.496 11.496 0 0 0 1.346 12c0 1.856.444 3.612 1.223 5.165l3.842-2.98Z"
      clipRule="evenodd"
    />
    <Path
      fill="#EA4335"
      fillRule="evenodd"
      d="M12.846 5.074c1.688 0 3.204.58 4.396 1.72l3.299-3.299C18.549 1.64 15.946.5 12.846.5A11.496 11.496 0 0 0 2.569 6.835l3.842 2.98c.904-2.718 3.44-4.741 6.435-4.741Z"
      clipRule="evenodd"
    />
  </Svg>
);
const GoogleIcon = memo(SvgComponent);
export default GoogleIcon;
