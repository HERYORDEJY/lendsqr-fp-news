import * as React from 'react';
import { memo } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    //   @ts-ignore
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={props.color ?? '#1C274D'}
      fillRule="evenodd"
      d="M21 11.098v4.993c0 3.096 0 4.645-.734 5.321-.35.323-.792.526-1.263.58-.987.113-2.14-.907-4.445-2.946-1.02-.901-1.529-1.352-2.118-1.47a2.225 2.225 0 0 0-.88 0c-.59.118-1.099.569-2.118 1.47-2.305 2.039-3.458 3.059-4.445 2.945a2.238 2.238 0 0 1-1.263-.579C3 20.736 3 19.188 3 16.091v-4.994C3 6.81 3 4.665 4.318 3.333 5.636 2 7.758 2 12 2c4.243 0 6.364 0 7.682 1.332C21 4.665 21 6.81 21 11.098ZM8.25 6A.75.75 0 0 1 9 5.25h6a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 8.25 6Z"
      clipRule="evenodd"
    />
  </Svg>
);
const BookmarkFilledIcon = memo(SvgComponent);
export default BookmarkFilledIcon;
