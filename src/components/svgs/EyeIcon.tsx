import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props: any) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M14.4759 9.43478C13.8284 8.78722 12.9417 8.38872 11.9554 8.38872C9.98286 8.38872 8.38885 9.98272 8.38885 11.9553C8.38885 12.9416 8.78736 13.8282 9.43492 14.4758"
        stroke="currentColor"
        stroke-width="1.49438"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M17.7529 5.74845C16.0095 4.4334 14.017 3.71609 11.9548 3.71609C8.438 3.71609 5.16033 5.7883 2.87892 9.3748C1.9823 10.7795 1.9823 13.1406 2.87892 14.5453C3.66596 15.7807 4.58251 16.8467 5.57876 17.7035"
        stroke="currentColor"
        stroke-width="1.49438"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8.38852 19.457C9.52424 19.9352 10.7297 20.1942 11.9551 20.1942C15.4719 20.1942 18.7495 18.122 21.0309 14.5355C21.9276 13.1308 21.9276 10.7697 21.0309 9.36495C20.7022 8.8469 20.3435 8.35874 19.9749 7.90047"
        stroke="currentColor"
        stroke-width="1.49438"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M15.4527 12.6532C15.1937 14.0579 14.048 15.2036 12.6433 15.4627"
        stroke="currentColor"
        stroke-width="1.49438"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M17.5 5.5C18 5.83333 19.3 6.9 20.5 8.5M8.5 19.5C8 19.3333 6.7 18.7 5.5 17.5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
}

const EyeIcon = React.memo(SvgComponent);
export default EyeIcon;
