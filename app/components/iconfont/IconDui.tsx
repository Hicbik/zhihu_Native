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

const IconDui: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M47.5 493.5L99 420.7l242.3 185.8L931.2 126l49.7 47.6L345.4 798 47.5 493.5z m0 0"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconDui.defaultProps = {
  size: 18,
};

export default IconDui;
