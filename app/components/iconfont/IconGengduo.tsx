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

const IconGengduo: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M164.3 512.2m-100 0a100 100 0 1 0 200 0 100 100 0 1 0-200 0Z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M512.3 512.2m-100 0a100 100 0 1 0 200 0 100 100 0 1 0-200 0Z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M860.4 512.2m-100 0a100 100 0 1 0 200 0 100 100 0 1 0-200 0Z"
        fill={getIconColor(color, 2, '#333333')}
      />
    </Svg>
  );
};

IconGengduo.defaultProps = {
  size: 18,
};

export default IconGengduo;
