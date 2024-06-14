import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={25} height={25} viewBox="0 0 25 25" fill="none">
      <Path
        d="M12.4098 12.7978C15.1609 12.7978 17.3911 10.5676 17.3911 7.81658C17.3911 5.06551 15.1609 2.83533 12.4098 2.83533C9.65876 2.83533 7.42857 5.06551 7.42857 7.81658C7.42857 10.5676 9.65876 12.7978 12.4098 12.7978Z"
        stroke="#797979"
        stroke-width="1.49438"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M20.9679 22.7606C20.9679 18.9051 17.1323 15.7868 12.4101 15.7868C7.68787 15.7868 3.85231 18.9051 3.85231 22.7606"
        stroke="#797979"
        stroke-width="1.49438"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

const UserIcon = React.memo(SvgComponent);
export default UserIcon;
