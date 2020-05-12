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

const IconJiahao1: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M103 551.5c-22.091 0-40-17.909-40-40s17.909-40 40-40h818.602c22.091 0 40 17.909 40 40s-17.909 40-40 40H103z"
        fill={getIconColor(color, 0, '#2F54EB')}
      />
      <Path
        d="M472.3 103.2c0-22.092 17.91-40 40-40 22.092 0 40 17.908 40 40v818.6c0 22.092-17.908 40-40 40-22.09 0-40-17.908-40-40V103.2z"
        fill={getIconColor(color, 1, '#2F54EB')}
      />
    </Svg>
  );
};

IconJiahao1.defaultProps = {
  size: 18,
};

export default IconJiahao1;
