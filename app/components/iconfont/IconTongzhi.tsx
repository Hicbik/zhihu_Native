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

const IconTongzhi: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M 144 752 V 480 a 368.064 368.064 0 0 1 320 -364.928 V 64 a 48 48 0 0 1 96 0 v 51.072 c 180.544 23.552 320 177.92 320 364.928 v 272 H 960 a 48 48 0 1 1 0 96 H 64 a 48 48 0 1 1 0 -96 h 80 Z m 96 0 h 544 V 480 a 272 272 0 1 0 -544 0 v 272 Z m 80 256 a 48 48 0 1 1 0 -96 h 384 a 48 48 0 1 1 0 96 H 320 Z"
        fill={getIconColor(color, 0, '#1296db')}
      />
    </Svg>
  );
};

IconTongzhi.defaultProps = {
  size: 18,
};

export default IconTongzhi;
