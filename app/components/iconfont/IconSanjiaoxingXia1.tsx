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

const IconSanjiaoxingXia1: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M412.09483882 238.99463485l312.10497109 220.3705703c32.88608539 23.61354214 32.88608539 82.64771575 0 106.2612579l-312.10497109 221.03189461c-32.88608539 23.61354214-87.24070532 6.68134861-87.24070533-40.54573566l0-467.23421228c0-47.22708429 54.35461994-63.49731702 87.24070533-39.88313839z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconSanjiaoxingXia1.defaultProps = {
  size: 18,
};

export default IconSanjiaoxingXia1;
