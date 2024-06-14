import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props: any) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M6.9212 10.4332V8.44072C6.9212 5.14313 7.91745 2.46322 12.8987 2.46322C17.88 2.46322 18.8762 5.14313 18.8762 8.44072V10.4332"
        stroke="currentColor"
        stroke-width="1.49438"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12.8983 18.9013C14.2738 18.9013 15.3889 17.7862 15.3889 16.4107C15.3889 15.0351 14.2738 13.92 12.8983 13.92C11.5227 13.92 10.4077 15.0351 10.4077 16.4107C10.4077 17.7862 11.5227 18.9013 12.8983 18.9013Z"
        stroke="currentColor"
        stroke-width="1.49438"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M17.8794 22.388H7.91692C3.93192 22.388 2.93567 21.3917 2.93567 17.4067V15.4142C2.93567 11.4292 3.93192 10.433 7.91692 10.433H17.8794C21.8644 10.433 22.8607 11.4292 22.8607 15.4142V17.4067C22.8607 21.3917 21.8644 22.388 17.8794 22.388Z"
        stroke="currentColor"
        stroke-width="1.49438"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

const LockIcon = React.memo(SvgComponent);
export default LockIcon;
