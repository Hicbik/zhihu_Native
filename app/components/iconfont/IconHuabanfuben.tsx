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

const IconHuabanfuben: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 199.424a256 256 0 1 1-256 256 256.256 256.256 0 0 1 256-256m0-102.4a358.4 358.4 0 1 0 358.4 358.4 358.4 358.4 0 0 0-358.4-358.4z"
        fill={getIconColor(color, 0, '#4C4C4C')}
      />
      <Path
        d="M769.536 862.464H254.464a50.176 50.176 0 0 0-50.176 50.176v3.584a50.176 50.176 0 0 0 50.176 50.176h515.072a50.176 50.176 0 0 0 50.176-50.176v-3.584a50.176 50.176 0 0 0-50.176-50.176z"
        fill={getIconColor(color, 1, '#4C4C4C')}
      />
      <Path
        d="M409.6 605.696a51.456 51.456 0 0 1 51.2-51.2h102.4a51.456 51.456 0 0 1 51.2 51.2 51.456 51.456 0 0 1-51.2 51.2h-102.4a51.2 51.2 0 0 1-51.2-51.2z"
        fill={getIconColor(color, 2, '#FCC53A')}
      />
    </Svg>
  );
};

IconHuabanfuben.defaultProps = {
  size: 18,
};

export default IconHuabanfuben;
