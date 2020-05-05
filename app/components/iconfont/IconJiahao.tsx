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

const IconJiahao: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0c-285.257143 0-512 226.742857-512 512s226.742857 512 512 512 512-226.742857 512-512-226.742857-512-512-512z m0 950.857143c-241.371429 0-438.857143-197.485714-438.857143-438.857143s197.485714-438.857143 438.857143-438.857143 438.857143 197.485714 438.857143 438.857143-197.485714 438.857143-438.857143 438.857143z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M731.428571 475.428571h-182.857142v-182.857142c0-21.942857-14.628571-36.571429-36.571429-36.571429s-36.571429 14.628571-36.571429 36.571429v182.857142h-182.857142c-21.942857 0-36.571429 14.628571-36.571429 36.571429s14.628571 36.571429 36.571429 36.571429h182.857142v182.857142c0 21.942857 14.628571 36.571429 36.571429 36.571429s36.571429-14.628571 36.571429-36.571429v-182.857142h182.857142c21.942857 0 36.571429-14.628571 36.571429-36.571429s-14.628571-36.571429-36.571429-36.571429z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconJiahao.defaultProps = {
  size: 18,
};

export default IconJiahao;
