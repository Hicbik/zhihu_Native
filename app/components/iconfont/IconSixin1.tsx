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

const IconSixin1: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M650.5 436.3c2.4 3.3 3.3 7.4 2.6 11.4-0.7 4-3 7.5-6.4 9.8h0.3l-129.9 91.9c-2.6 2-5.9 3-9.1 2.9-3.5 0.3-7.1-0.7-10-2.6l-119.3-81.6c-6.8-4.7-8.6-14-4.1-20.9 5-7 14.7-8.7 21.8-3.8l111.3 74.8 121.1-85.4c7-4.9 16.6-3.4 21.7 3.5z"
        fill={getIconColor(color, 0, '#1296db')}
      />
      <Path
        d="M512.8 67.4C266 67.4 65.9 267.5 65.9 514.2 65.9 761 266 961.1 512.8 961.1S959.6 761 959.6 514.2c0-246.7-200-446.8-446.8-446.8z m229.1 615.8c-14.8 15.1-35.4 23.2-56.6 22.2H331.9c-19.7-1.3-38.1-10.4-51.2-25.2-13-14.9-19.6-34.3-18.3-54V401.8c-1.4-21.1 6.3-41.9 21.2-57 14.8-15.1 35.4-23.2 56.6-22.3h353.4c19.7 1.3 38.1 10.4 51.2 25.2 13 14.9 19.6 34.3 18.3 54v224.4c1.3 21.3-6.4 42-21.2 57.1z"
        fill={getIconColor(color, 1, '#1296db')}
      />
    </Svg>
  );
};

IconSixin1.defaultProps = {
  size: 18,
};

export default IconSixin1;
