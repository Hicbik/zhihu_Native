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

const IconFaxian: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 1008.941176C237.537882 1008.941176 15.058824 786.462118 15.058824 512S237.537882 15.058824 512 15.058824 1008.941176 237.537882 1008.941176 512 786.462118 1008.941176 512 1008.941176z m0-90.352941c224.557176 0 406.588235-182.031059 406.588235-406.588235S736.557176 105.411765 512 105.411765 105.411765 287.442824 105.411765 512 287.442824 918.588235 512 918.588235z m238.772706-632.470588l-164.201412 312.048941L286.117647 750.772706l152.576-300.453647L750.772706 286.117647z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconFaxian.defaultProps = {
  size: 18,
};

export default IconFaxian;
