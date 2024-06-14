import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props: any) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M15.0466 9.90487L10.0056 14.9459C9.358 14.2983 8.9595 13.4117 8.9595 12.4254C8.9595 10.4528 10.5535 8.85881 12.5261 8.85881C13.5124 8.85881 14.399 9.25731 15.0466 9.90487Z"
        stroke="currentColor"
        stroke-width="1.49438"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.3236 6.21854C16.5801 4.90349 14.5876 4.18619 12.5254 4.18619C9.00864 4.18619 5.73098 6.25839 3.44957 9.84489C2.55294 11.2496 2.55294 13.6107 3.44957 15.0154C4.23661 16.2508 5.15316 17.3168 6.14941 18.1735"
        stroke="currentColor"
        stroke-width="1.49438"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8.95917 19.9271C10.0949 20.4053 11.3004 20.6643 12.5257 20.6643C16.0425 20.6643 19.3202 18.5921 21.6016 15.0056C22.4982 13.6009 22.4982 11.2398 21.6016 9.83506C21.2728 9.317 20.9142 8.82884 20.5456 8.37057"
        stroke="currentColor"
        stroke-width="1.49438"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16.0234 13.1233C15.7643 14.528 14.6186 15.6737 13.2139 15.9327"
        stroke="currentColor"
        stroke-width="1.49438"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10.0059 14.9461L2.5639 22.3881"
        stroke="currentColor"
        stroke-width="1.49438"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M22.4886 2.46321L15.0466 9.9052"
        stroke="currentColor"
        stroke-width="1.49438"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

const EyeSlashIcon = React.memo(SvgComponent);
export default EyeSlashIcon;
