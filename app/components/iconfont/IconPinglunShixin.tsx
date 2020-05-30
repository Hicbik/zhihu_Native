/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

const IconPinglunShixin: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M881.237333 63.36c44.544 0 80.768 36.266667 80.768 80.768V744.106667c0 44.544-36.266667 80.768-80.768 80.768h-185.941333l-105.344 105.386666a110.336 110.336 0 0 1-78.549333 32.512c-29.696 0-57.6-11.562667-78.549334-32.554666l-105.344-105.344h-184.746666a80.853333 80.853333 0 0 1-80.768-80.768V144.128c0-44.544 36.266667-80.768 80.768-80.768h738.474666zM558.165333 501.76h-253.866666a34.602667 34.602667 0 1 0 0 69.248h253.866666a34.602667 34.602667 0 1 0 0-69.248z m138.453334-192.597333H304.298667a34.602667 34.602667 0 1 0 0 69.248h392.32a34.602667 34.602667 0 1 0 0-69.248z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconPinglunShixin.defaultProps = {
  size: 18,
};

export default IconPinglunShixin;
